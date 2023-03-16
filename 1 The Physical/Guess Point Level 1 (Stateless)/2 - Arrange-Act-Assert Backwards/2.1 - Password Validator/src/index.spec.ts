import { Password } from "./index"

const invalidLengthError = { type: "INVALID_LENGTH", message: "Password must be between 1 and 15 characters" };
const invalidFormatNoDigit = { type: "INVALID_FORMAT", message: "Password contain at least 1 digit" };
const invalidFormateNoUpperCase = { type: "INVALID_FORMAT", message: "Password contain at least 1 uppercase character" };

describe('password validator', () => {
  describe("Given the password validator is provided a password", () => {
    const lengthTestCases: [string, { valid: boolean, errors: { type: string, message: string }[] }][] = [
      ["s", { valid: false, errors: [invalidLengthError, invalidFormatNoDigit, invalidFormateNoUpperCase] }],
      ["passwordistoomanycharacterssorry", { valid: false, errors: [invalidLengthError, invalidFormatNoDigit, invalidFormateNoUpperCase] }],
      ["Password1", { valid: true, errors: [] }]
    ]
    it.each(lengthTestCases)("Then it should be between 5 and 15 characters %s", (password, expected) => {
      expect(Password.validate(password)).toEqual(expected)
    })
  })
})
