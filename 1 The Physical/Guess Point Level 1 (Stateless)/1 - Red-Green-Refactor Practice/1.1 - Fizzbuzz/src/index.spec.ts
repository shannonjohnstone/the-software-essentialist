import { fizzbuzz } from "./fizzbuzz"

describe("fizzbuzz", () => {
  it("Should return a string", () => {
    expect(typeof fizzbuzz()).toEqual("string")
  })
});
