import { Result } from "../../shared/result";
import { ValidationError } from "../../shared/validator";
import { AbstractValueObject, Validator } from "./abstract-value-object";

interface EmailInputProps {
  firstName: string;
  lastName: string;
}

export class Email extends AbstractValueObject<string> {
  static readonly pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

  static readonly errorObject = {
    type: "INVALID_EMAIL",
    message: `Email must match format of [name]@essentialist.dev`,
  };

  constructor(emailProps: EmailInputProps, public validator: Validator) {
    super(
      Email.generateEmail(emailProps),
      validator,
      Email.pattern,
      Email.errorObject
    );
  }

  static generateEmail({
    firstName = "",
    lastName = "",
  }: {
    firstName: string;
    lastName: string;
  }): string {
    const last = lastName.slice(0, 5);
    const first = firstName.slice(0, 2);

    return `${last}${first}@essentialist.dev`.toLowerCase();
  }

  static create(
    emailProps: EmailInputProps,
    validator: Validator
  ): Result<Email, ValidationError> {
    const email = new Email(emailProps, validator);

    if (email.error) return Result.fail(email.error);

    return Result.ok(email);
  }
}
