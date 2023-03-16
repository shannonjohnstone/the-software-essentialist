interface Error {
  type: string
  message: string
}
export class ErrorEngine {
  static create(isValid: boolean, error: Error) {
    if (isValid) return { valid: true, error: {} }

    return { valid: false, error }
  }

  static run(errors: { valid: boolean, error: Partial<Error> }[]) {
    return errors.reduce((acc: { valid: boolean, errors: Partial<Error>[] }, item: { valid: boolean, error: Partial<Error> }) => {
      if (!item.valid) {
        return { ...acc, valid: false, errors: [...acc.errors, item?.error] }
      }
      return acc
    }, { valid: true, errors: [] })
  }
}