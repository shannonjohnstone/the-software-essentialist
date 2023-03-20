import { BooleanCalculator } from "./index"
describe('BooleanCalculator', () => {
  const singelBooleanUseCases: ["TRUE" | "FALSE", boolean][] = [["TRUE", true], ["FALSE", false]];
  describe.each(singelBooleanUseCases)("Given a single boolean of %s is provided", (booleanAsString, expected: boolean) => {
    it(`Then a single boolean of ${expected} should be returned`, () => {
      expect(BooleanCalculator.evaluate(booleanAsString)).toEqual(expected)
    })
  })
})
