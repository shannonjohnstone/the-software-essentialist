import { fizzbuzz } from "./fizzbuzz"

describe("fizzbuzz", () => {
  it("Should return a string", () => {
    expect(typeof fizzbuzz([])).toEqual("string")
  })

  const testCases: [number[], string][] = [
    [[], ""]
  ]

  describe.each(testCases)("Given the fizzbuzz is provided %s", (numbers, expected) => {
    it(`Should return ${expected}`, () => {
      expect(fizzbuzz(numbers)).toEqual(expected)
    })
  })
});
