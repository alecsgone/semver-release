#!/usr/bin/env node

const semver = require('semver')
const { version } = require(process.cwd() + '/package.json')
const versionCalculator = require('./src/versionCalculator')
const commitFetcher = require('./src/commitFetcher')

async function main() {
  try {
    const commits = await commitFetcher(version)
    const nextBump = versionCalculator(commits)

    if (nextBump) {
      console.log(nextBump, semver.inc(version, nextBump))
      console.log('attempt to release!');
      // const npmVersion = spawnSync('npm', `version ${semVersions[range]}`.split(' '))
      // console.log('createing with npm', npmVersion.stdout.toString())
    } else {
      console.log('no versions to bump');
    }
  } catch (e) {
    console.error('impossible to bump');
    console.log(e);
  }
}

main()
