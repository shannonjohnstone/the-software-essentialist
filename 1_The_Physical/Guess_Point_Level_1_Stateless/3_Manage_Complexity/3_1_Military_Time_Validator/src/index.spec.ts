import { TimeValidator } from "./index"

describe('TimeValidator', () => {
  it("Should be truthy", () => {
    expect(TimeValidator.isValid24HourTimeRange("01:12 - 14:32")).toEqual(true)
  })
})
