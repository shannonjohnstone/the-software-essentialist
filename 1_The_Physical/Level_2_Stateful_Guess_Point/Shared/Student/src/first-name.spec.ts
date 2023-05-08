import { FirstName } from "./first-name";

describe("First name", () => {
  describe("Given a first name is created", () => {
    it("Then there should be a valid first name instance", () => {
      const firstName = FirstName.create("John");
      expect(firstName).toBeInstanceOf(FirstName);
    });
  });

  describe("Given a first name is created", () => {
    it("Then get name value", () => {
      const firstName = FirstName.create("John");
      expect(firstName.value).toEqual("John");
    });
  });
});
