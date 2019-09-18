#!/usr/bin/env node

const semver = require('semver')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { version } = require(process.cwd() + '/package.json')
const versionCalculator = require('./src/versionCalculator')
const commitFetcher = require('./src/commitFetcher')

async function main() {
  try {
    const commits = await commitFetcher(version)
    const nextBump = versionCalculator(commits)

    if (process.env.DEBUG) { console.log(commits) }

    if (nextBump) {
      console.log(
        'Trying to release!',
        nextBump,
        semver.inc(version, nextBump)
      )
      const { stdout, stderr } = await exec(`npm version ${nextBump}`);

      if (stderr) { console.error(`error: ${stderr}`) }

      stdout.split('\n').map(console.log.bind(console))
    } else {
      console.log('There aren\'t commits to create a new versions');
    }
  } catch (e) {
    console.log(e);
    console.error('Impossible to bump');
  }
}

main()
