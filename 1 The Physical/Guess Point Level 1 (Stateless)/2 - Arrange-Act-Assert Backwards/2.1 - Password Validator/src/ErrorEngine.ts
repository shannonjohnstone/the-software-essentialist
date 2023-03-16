interface Error {
  type: string
  message: string
}
export class ErrorEngine {
  static create(isValid: boolean, error: Error) {
    if (isValid) return { valid: true }

    return { valid: false, error }
  }

  static run(errors: { valid: boolean, error: Error }[]) {
    return errors.reduce((acc: { valid: boolean, errors: Error[] }, item: { valid: boolean, error: Error }) => {
      if (!item.valid) {
        return { ...acc, valid: false, errors: [...acc.errors, item.error] }
      }
      return acc
    }, { valid: true, errors: [] })
  }
}