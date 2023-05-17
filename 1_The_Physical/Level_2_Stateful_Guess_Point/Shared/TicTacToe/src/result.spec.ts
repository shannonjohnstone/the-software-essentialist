import { Result } from "./result";

describe("Result", () => {
  describe("Given the result is valid", () => {
    it("Then returns a value", () => {
      const result = new Result(true, undefined, "cat");

      expect(result.getValue).toBeTruthy();
    });
  });

  describe("Given the result is invalid", () => {
    it("Then returns a error", () => {
      const error = [{ type: "INVALID_ITEM", message: "This is invalid" }];
      const result = new Result(false, error);

      expect(result.error).toEqual(error);
    });
  });

  describe("Given the result is valid", () => {
    it("Then success will return a value", () => {
      const result = Result.ok("cat");

      expect(result.getValue).toBeTruthy();
    });
  });

  describe("Given the result is invalid", () => {
    it("Then success will return error", () => {
      const error = [{ type: "INVALID_ITEM", message: "This is invalid" }];
      const result = Result.fail(error);

      expect(result.error).toEqual(error);
    });
  });
});
