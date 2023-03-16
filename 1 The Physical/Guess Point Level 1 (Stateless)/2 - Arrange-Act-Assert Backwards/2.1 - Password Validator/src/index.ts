export class Password {
  static validate(password: string) {
    const passwordRegex = /(?=[A-Za-z0-9]{5,15}$)(?=.*[A-Z])(?=.*[0-9]).*$/g;
    return passwordRegex.test(password)
  }
}