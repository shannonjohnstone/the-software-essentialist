import { ErrorEngine } from "./ErrorEngine"

const ERROR_TYPE = "ERROR"

describe("ErrorEngine", () => {
  describe("Given a error object is created and the value is valid", () => {
    it("Then return a valid response", () => {
      expect(ErrorEngine.create(true, { type: ERROR_TYPE, message: "Sorry there is an error" })).toEqual({ valid: true })
    })
  })

  describe("Given a error object is created and the value is invalid", () => {
    it("Then return a error response", () => {
      expect(ErrorEngine.create(false, { type: ERROR_TYPE, message: "Sorry there is an error" })).toEqual({ valid: false, error: { type: ERROR_TYPE, message: "Sorry there is an error" } })
    })
  })

  describe("Given the ErrorEngine is ran with no errors", () => {
    it("Then return a flatten error response", () => {
      expect(ErrorEngine.run([
        { valid: true, error: { type: ERROR_TYPE, message: "Sorry there is an error" } },
        { valid: true, error: { type: ERROR_TYPE, message: "Sorry there is an error" } }
      ])).toEqual({ valid: true, errors: [] })
    })
  })

  describe("Given the ErrorEngine is ran with multiple errors", () => {
    it("Then return a flatten error response", () => {
      expect(ErrorEngine.run([
        { valid: false, error: { type: ERROR_TYPE, message: "Sorry there is an error" } },
        { valid: false, error: { type: ERROR_TYPE, message: "Sorry there is a second error" } }
      ])).toEqual({ valid: false, errors: [{ type: ERROR_TYPE, message: "Sorry there is an error" }, { type: ERROR_TYPE, message: "Sorry there is a second error" }] })
    })
  })
})