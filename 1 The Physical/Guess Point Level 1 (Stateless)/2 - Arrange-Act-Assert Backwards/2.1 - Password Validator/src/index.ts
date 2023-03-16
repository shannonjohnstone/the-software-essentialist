import { TextValidation } from "./TextValidation"
export class Password {
  static validate(password: string) {
    return (
      TextValidation.hasDigit(password) &&
      TextValidation.hasUpperCase(password) &&
      TextValidation.hasLength(password)
    );
  }
}