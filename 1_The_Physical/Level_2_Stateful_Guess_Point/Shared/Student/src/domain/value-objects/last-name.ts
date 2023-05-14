import { Result } from "../../shared/result";
import { ValidationError } from "../../shared/validator";
import { ValueObject } from "./value-object";

type Name = string;

type LastNameError = ValidationError | undefined;

type Validator = ({
  value,
  pattern,
}: {
  value: string;
  pattern: RegExp;
}) => boolean;

export class LastName implements ValueObject<Name, LastNameError> {
  private pattern = /^[a-z]{2,15}$/gi;

  constructor(private name: Name, private validator: Validator) { }

  static create(
    name: Name,
    validator: Validator
  ): Result<LastName, LastNameError> {
    const lastName = new LastName(name, validator);
    if (lastName.error) return Result.fail(lastName.error);
    return Result.ok(lastName);
  }

  update(name: Name) {
    return LastName.create(name, this.validator);
  }

  get error() {
    const { validator, name, pattern } = this;

    const isInvalid = !validator({ value: name, pattern });

    if (isInvalid) {
      return {
        type: "INVALID_LASTNAME",
        message: `Last name must be between 2 and 15 characters`,
      };
    }
  }

  get getValue() {
    return this.name;
  }
}
