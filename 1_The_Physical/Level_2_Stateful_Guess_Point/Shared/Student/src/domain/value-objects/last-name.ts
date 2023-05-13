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
  private pattern = /^[a-z]{1,15}$/gi;

  constructor(private name: Name, private validator: Validator) { }

  static create(
    name: Name,
    validator: Validator
  ): Result<LastName, LastNameError> {
    const lastName = new LastName(name, validator);
    if (lastName.error) return Result.failure(lastName.error);
    return Result.success(lastName);
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
        message: `Invalid last name value of "${name}"`,
      };
    }
  }

  get getValue() {
    return this.name;
  }
}
