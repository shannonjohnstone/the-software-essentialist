import { BooleanCalculator, CalculatorValues } from "./index"

describe('BooleanCalculator', () => {
  const singelBooleanUseCases: [string, boolean][] = [["TRUE", true], ["FALSE", false]];
  describe.each(singelBooleanUseCases)("Given a single boolean of %s is provided", (booleanAsString, expected: boolean) => {
    it(`Then a single boolean of ${expected} should be returned`, () => {
      expect(BooleanCalculator.evaluate(booleanAsString)).toEqual(expected)
    })
  })

  const multipleBooleanAndConditionUseCases: [string, boolean][] = [
    // ["TRUE AND TRUE", true],
    ["TRUE AND FALSE", false],
    ["TRUE OR TRUE OR TRUE AND FALSE", false],
    ["TRUE OR FALSE AND NOT FALSE", true],
    ["TRUE AND NOT FALSE AND TRUE", true],
    ["TRUE && TRUE || TRUE || FALSE", true],
    ["NOT TRUE", false],
    // ["NOT FALSE", true],
    ["(TRUE OR TRUE OR TRUE) AND FALSE", false],
    ["NOT (TRUE AND TRUE)", false],
  ];
  describe.each(multipleBooleanAndConditionUseCases)("Given a multiple booleans of %s is provided", (booleanAsString: string, expected: boolean) => {
    it(`Then a single boolean of ${expected} should be returned`, () => {
      expect(BooleanCalculator.evaluate(booleanAsString)).toEqual(expected)
    })
  })
})
