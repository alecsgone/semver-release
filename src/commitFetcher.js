const util = require('util');
const exec = util.promisify(require('child_process').exec);


async function commitFetcher(version) {
  try {
    const { stdout, stderr } = await exec(`git log v${version}..HEAD --oneline`);

    if (stderr) {
      console.error(`error: ${stderr}`);
    }

    return stdout.split('\n')
  } catch (e) {
    throw new Error('\n\nThe version might be invalid or withot git tag\n\n')
  }

}

module.exports = commitFetcher
