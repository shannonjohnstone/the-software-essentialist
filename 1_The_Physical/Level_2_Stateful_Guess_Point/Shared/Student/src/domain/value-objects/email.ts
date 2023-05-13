import { Result } from "../../shared/result";
import { ValidationError } from "../../shared/validator";

type EmailValueProp = string;

interface EmailProps {
  firstName: string;
  lastName: string;
}

type EmailError = ValidationError | undefined;

interface Entity<Props> {
  getValue: Props;
  error?: EmailError;
}

type Validator = ({
  value,
  pattern,
}: {
  value: string;
  pattern: RegExp;
}) => boolean;

export class Email implements Entity<EmailValueProp> {
  private pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
  private email: string;

  constructor(private emailProps: EmailProps, private validator: Validator) {
    this.email = Email.generateEmail(this.emailProps);
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
    emailProps: EmailProps,
    validator: Validator
  ): Result<Email, EmailError> {
    const email = new Email(emailProps, validator);

    if (email.error) return Result.failure(email.error);
    return Result.success(email);
  }

  get error() {
    const { validator, email, pattern } = this;

    const isInvalid = !validator({ value: email, pattern });

    if (isInvalid) {
      return {
        type: "INVALID_EMAIL",
        message: `Invalid email email of '${email}', using a first name of '${this.emailProps.firstName}' and '${this.emailProps.lastName}'`,
      };
    }
  }

  get getValue() {
    return this.email;
  }
}
