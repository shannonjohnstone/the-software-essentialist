class TextValidation {
  static hasUpperCase(password: string) {
    return /[A-Z]/.test(password)
  }
  static hasDigit(password: string) {
    return /d/.test(password)
  }
  static hasLength(password: string, min: number, max: number) {
    return password.length >= min && password.length <= max
  }
}

export class Password {
  static validate(password: string) {
    return (
      TextValidation.hasDigit(password) &&
      TextValidation.hasUpperCase(password) &&
      TextValidation.hasLength(password, 5, 15)
    );
  }
}