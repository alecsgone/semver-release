const semVersions = ['patch', 'minor', 'major']
const versions = ['fix', 'feat']

/**
 * calculate version bump based on the commit message.
 *
 * @param  {Array} commits
 * @return {String} patch minor major or undefined if no conventional commits were found
 */
function versionCalculator(commits) {
  if (!commits.filter(Boolean).length) {
    console.error('The commit list seems falsy or empty');
    return
  }

  const range = commits.reduce((acc, commit) => {
    try {
      const withoutCommit = commit.replace(/^\S+\s/, '')
      const conventionalWord = withoutCommit.match(/[a-zA-Z]+\b/)[0]
      const currentRange = versions.indexOf(conventionalWord)

      return acc > currentRange ? acc : currentRange
    } catch (e) {
      console.warn('Could not parse:', commit, typeof commit);
      return acc
    }
  }, -1)


  return semVersions[range]
}

module.exports = versionCalculator
