export interface ValidationError {
  type: string;
  message: string;
}

export interface ValidatorProps {
  value: string;
  pattern: RegExp;
}

type ValidatorItem = ValidationError;

export class Validator {
  static validate(items: ValidatorItem[]): ValidationError[] {
    return items.map((validator) => validator).filter(Boolean);
  }

  static validator({ value, pattern }: ValidatorProps) {
    const regex = new RegExp(pattern);
    return !!value || regex.test(value);
  }
}
