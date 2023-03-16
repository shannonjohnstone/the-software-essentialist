export class TextValidation {
  static hasUpperCase(password: string): boolean {
    return /[A-Z]/.test(password)
  }
  static hasDigit(password: string): boolean {
    return /\d/.test(password)
  }
  static hasLength(password: string, { min, max } = { min: 5, max: 15 }): boolean {
    return password.length >= min && password.length <= max
  }
}