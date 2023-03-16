export class ErrorEngine {
  static create(isValid: boolean, error: { type: string, message: string }) {
    if (isValid) return { valid: true }

    return { valid: false, error }
  }
}