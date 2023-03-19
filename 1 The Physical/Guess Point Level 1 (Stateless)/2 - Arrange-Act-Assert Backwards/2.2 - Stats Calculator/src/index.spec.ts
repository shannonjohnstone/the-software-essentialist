import exp from "constants"
import { StatsCalculator } from "./index"
describe('stats calculator', () => {
  const testCases: [string, number[], Function, number][] = [
    ["minimum", [2, 4, 21, -8, 53, 40], StatsCalculator.minimum, - 8],
    ["maximum", [2, 4, 21, -8, 53, 40], StatsCalculator.maximum, 53],
    ["elementsCount", [2, 4, 21, -8, 53, 40], StatsCalculator.elementsCount, 6],
    ["average", [2, 4, 21, -8, 53, 40], StatsCalculator.average, 18.666666666666668],
  ]
  describe.each(testCases)("Given the %s method on the StatsCalculator is invoked with the values of %s", (_, numbers, statsMethod, expected) => {
    it("Then should return a response of %s", () => {
      expect(statsMethod(numbers)).toEqual(expected)
    })
  })
})