import { ErrorEngine } from "./ErrorEngine"

describe("ErrorEngine", () => {
  describe("Given a error is created", () => {
    it("Then return the error", () => {
      expect(ErrorEngine.create()).toEqual(true)
    })
  })
})