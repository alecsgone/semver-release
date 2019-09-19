const versionCalculator = require('../versionCalculator')

console.error = jest.fn()
console.warn = jest.fn()

test('patch version when fix word is present', () => {
  const commits = [
    '4123421b fix: all the time',
    '4123421b fix(chanfle): all the time',
    '4123421b fox: all the time',
  ]

  expect(versionCalculator(commits)).toBe('patch')
})

test('minor version when feat word is present', () => {
  const commits = [
    null,
    '4123421b fix(pencil): all the time',
    '',
    '4123421b feat: all the time',
    '4123421b fox: all the time',
  ]

  expect(versionCalculator(commits)).toBe('minor')
  expect(console.warn).toHaveBeenCalledTimes(2)
})

test('undefined if the commits dont include fix or minor', () => {
  const commits = [
    '4123421b faix: all the time',
    'afsdffasdfas faat: all the time',
    '',
    null,
    null,
    '412341234 merge: all the time',
  ]

  expect(versionCalculator(commits)).toBe(undefined)
  expect(console.warn).toHaveBeenCalledTimes(3)
})

test('undefined for empty array of commits', () => {
  const commits = []

  expect(versionCalculator(commits)).toBe(undefined)
  expect(console.error).toHaveBeenCalledTimes(1)
})

test('undefined for null and empty string on the array of commits', () => {
  const commits = [null, undefined, '']

  expect(versionCalculator(commits)).toBe(undefined)
  expect(console.error).toHaveBeenCalledTimes(1)
})

test('undefined if there are no conventional commits in the array', () => {
  const commits = [
    '4123421b fox: all the time',
  ]

  expect(versionCalculator(commits)).toBe(undefined)
})
