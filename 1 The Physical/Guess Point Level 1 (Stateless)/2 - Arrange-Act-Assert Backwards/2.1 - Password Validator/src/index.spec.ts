import { passwordValidator } from "./index"
describe('password validator', () => {
  describe("Given the password validator is provided a password", () => {
    it("Then it should be between 5 and 15 characters", () => {
      expect(passwordValidator("password")).toEqual(true)
    })

    const testCases: [string, boolean][] = [
      ["s", false],
      ["1", false],
      ["1S", true]
    ]
    it.each(testCases)("Then it should contain at least 1 digit and 1 uppercase character", (password, expected) => {
      expect(passwordValidator(password)).toEqual(expected)
    })
  })
})
