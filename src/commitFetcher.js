const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function commitFetcher(version) {
  try {
    const { stdout, stderr } = await exec(`git log v${version}..HEAD --oneline`);

    if (stderr) { console.error(`error: ${stderr}`) }

    return stdout.split('\n')
  } catch (e) {
    throw new Error(`\nThe version might be invalid, or the tag v${version} is missing.\n`)
  }
}

module.exports = commitFetcher
