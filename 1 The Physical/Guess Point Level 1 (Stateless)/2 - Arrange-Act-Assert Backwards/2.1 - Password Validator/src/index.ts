import { TextValidation } from "./TextValidation"
import { ErrorEngine } from "./ErrorEngine"
export class Password {
  static validate(password: string) {
    return ErrorEngine.run([
      ErrorEngine.create(TextValidation.hasDigit(password), { type: "INVALID_FORMAT", message: "Passowrd must contain at least 1 digit" }),
      ErrorEngine.create(TextValidation.hasUpperCase(password), { type: "INVALID_FORMAT", message: "Passowrd must contain at least 1 uppercase character" }),
      ErrorEngine.create(TextValidation.hasLength(password), { type: "INVALID_LENGTH", message: "Password must be between 1 and 15 characters" }),
    ]);
  }
}