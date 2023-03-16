import { TextValidation } from "./TextValidation"

describe('TextValidator', () => {
  const useCases: [string, string, Function, boolean][] = [
    ["hasDigit", "1", TextValidation.hasDigit, true],
    ["hasUpperCase", "P", TextValidation.hasUpperCase, true],
    ["hasLength", "qwertyuiopasdfg", TextValidation.hasLength, true]
  ]
  describe.each(useCases)("Given the %s validator is invoke with the value of %s", (_, value: string, validator: Function, expected: boolean) => {
    it("Then should be valid", () => {
      expect(validator(value)).toEqual(expected)
    })
  })
})
