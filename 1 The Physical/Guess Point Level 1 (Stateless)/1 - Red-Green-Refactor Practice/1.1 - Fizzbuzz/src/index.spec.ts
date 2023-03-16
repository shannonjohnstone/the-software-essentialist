import { fizzbuzz } from "./fizzbuzz"

describe("Fizzbuzz", () => {
  const testCases: [number[], string][] = [
    [[], ""],
    [[1, 2, 3, 4, 5, 6, 15], "12Fizz4BuzzFizzFizzBuzz"]
  ]

  describe.each(testCases)("Given the fizzbuzz function is provided %s", (numbers, expected) => {
    it(`Should return cake ${expected}`, () => {
      expect(fizzbuzz(numbers)).toEqual(expected)
    })
  })
});
