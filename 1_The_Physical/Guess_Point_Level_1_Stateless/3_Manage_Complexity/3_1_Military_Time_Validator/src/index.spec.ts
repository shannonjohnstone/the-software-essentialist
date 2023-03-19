import { TimeValidator } from "./index"

describe('TimeValidator', () => {
  it("Should be truthy", () => {
    expect(TimeValidator.is24HourTime()).toEqual(true)
  })
})
