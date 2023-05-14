import { Result } from "../../shared/result";
import { ValidationError } from "../../shared/validator";
import { AbstractValueObject, Validator } from "./abstract-value-object";

type Name = string;

export class LastName extends AbstractValueObject<Name> {
  static readonly pattern = /^[a-z]{2,15}$/gi;

  static readonly errorObject = {
    type: "INVALID_LASTNAME",
    message: `Last name must be between 2 and 15 characters`,
  };

  static create(
    name: Name,
    validator: Validator
  ): Result<LastName, ValidationError> {
    const lastName = new LastName(
      name,
      validator,
      this.pattern,
      this.errorObject
    );
    if (lastName.error) return Result.fail(lastName.error);

    return Result.ok(lastName);
  }

  update(name: Name) {
    return LastName.create(name, this.validator);
  }
}
