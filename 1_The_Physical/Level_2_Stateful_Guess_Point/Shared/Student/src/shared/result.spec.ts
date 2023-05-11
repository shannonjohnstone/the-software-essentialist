import { Result } from "./result";

describe("Result", () => {
  describe("Given the result is valid", () => {
    it("Then returns a value", () => {
      const result = new Result("cat");

      expect(result.value).toBeTruthy();
    });
  });

  describe("Given the result is invalid", () => {
    it("Then returns a error", () => {
      const error = [{ type: "INVALID_ITEM", message: "This is invalid" }];
      const result = new Result(undefined, error);

      expect(result.value).toBeFalsy();
      expect(result.error).toEqual(error);
    });
  });
});
