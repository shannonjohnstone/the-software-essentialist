import exp from "constants"
import { isPalindrome } from "./index"
describe('palindrome checker', () => {
  const testCases: [string, boolean][] = [
    ["Mom", true],
    ["Was It A Rat I Saw", true],
    ["Dog", false]
  ]

  describe.each(testCases)("Given the palindrome is provided a word of pharse of %s", (text, expected) => {
    it(`Should be ${expected}`, () => {
      expect(isPalindrome(text)).toEqual(expected)
    })
  })
})