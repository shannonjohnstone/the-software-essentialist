import { ValidationError } from "./validator";

interface EmailProps {
  firstName: string;
  lastName: string;
}

interface Entity<Props> {
  value: Props;
  error?: ValidationError | void;
}

type Validator = ({
  value,
  pattern,
}: {
  value: string;
  pattern: RegExp;
}) => boolean;

export class Email implements Entity<string> {
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

  static create(emailProps: EmailProps, validator: Validator): Email {
    return new Email(emailProps, validator);
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

  get value() {
    return this.email;
  }
}
