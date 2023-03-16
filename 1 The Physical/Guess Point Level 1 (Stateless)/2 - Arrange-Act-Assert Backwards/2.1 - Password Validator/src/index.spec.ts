import { passwordValidator } from "./index"
describe('password validator', () => {
  describe("Given the password validator is provided a password", () => {
    const lengthTestCases: [string, boolean][] = [
      ["s", false],
      ["passwordistoomanycharacterssorry", false],
      ["Password1", true]
    ]
    it.each(lengthTestCases)("Then it should be between 5 and 15 characters %s", (password, expected) => {
      expect(passwordValidator(password)).toEqual(expected)
    })
  })
  describe("Given the password validator is provided a password", () => {
    const formatTestCases: [string, boolean][] = [
      ["s", false],
      ["1", false],
      ["Password1", true]
    ]
    it.each(formatTestCases)("Then it should contain at least 1 digit and 1 uppercase character %s", (password, expected) => {
      expect(passwordValidator(password)).toEqual(expected)
    })
  })
})
