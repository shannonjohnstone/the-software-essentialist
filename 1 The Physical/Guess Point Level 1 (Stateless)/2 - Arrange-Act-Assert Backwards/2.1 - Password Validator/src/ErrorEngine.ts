export interface Error {
  type: string
  message: string
}

export interface ErrorEngineItem {
  valid: boolean
  error: Partial<Error>
}

export interface ErrorEngineResponse {
  valid: boolean, errors: Partial<Error>[]
}

export enum ERROR_TYPES {
  INVALID_FORMAT = "INVALID_FORMAT",
  INVALID_LENGTH = "INVALID_LENGTH"
}

export class ErrorEngine {
  static create(isValid: boolean, error: Error): ErrorEngineItem {
    if (isValid) return { valid: true, error: {} }

    return { valid: false, error }
  }

  static run(errors: ErrorEngineItem[]): ErrorEngineResponse {
    const reduceErrors = (acc: ErrorEngineResponse, item: ErrorEngineItem) => {
      if (!item.valid) {
        return { ...acc, valid: false, errors: [...acc.errors, item?.error] }
      }
      return acc
    }

    return errors.reduce(reduceErrors, { valid: true, errors: [] })
  }
}