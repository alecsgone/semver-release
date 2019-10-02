#!/usr/bin/env node
const { spawnSync } = require('child_process')
const semver = require('semver')

const semVersions = ['patch', 'minor', 'major']
const versions = ['fix', 'feat']
const cmd = 'git'
let range = 0

function calculateRange(word) {
  const currentRange = versions.indexOf(word)
  range = range > currentRange ? range : currentRange
}

const lastVersion = require(process.cwd() + '/package.json').version
const commits = spawnSync(cmd, `log v${lastVersion}..HEAD --oneline`.split(' '))
const conventionalCommits = commits.output.map(commit => {
  try {
    return commit.toString().split('\n').filter(Boolean)
      .map(splittedCommit => {
        console.log(splittedCommit);
        try {
          const withoutCommit = splittedCommit.replace(/^\S+\s/, '')
          const conventionalWord = withoutCommit.match(/[a-zA-Z]+\b/)[0]

          calculateRange(conventionalWord)

          if (versions.indexOf(conventionalWord) > -1) {
            return splittedCommit
          }
        } catch (e) {
          console.log('error for:', splittedCommit);
        }
      }).filter(Boolean)
  } catch (e) {
    console.log(e);
    return ''
  }
})
.filter(item => item.length)

console.log(conventionalCommits);

if (conventionalCommits.length) {
  console.log(lastVersion, semVersions[range], semver.inc(lastVersion, semVersions[range]))
  console.log('attempt to release!');
  const npmVersion = spawnSync('npm', `version ${semVersions[range]}`.split(' '))
  console.log('createing with npm', npmVersion.stdout.toString())
} else {
  console.log('no versions to bump');
}
