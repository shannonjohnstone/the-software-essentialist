export function passwordValidator(password: string) {
  // Password regex, between 1-15 in length, 1 uppercase and 1 digit
  const passwordRegex = /(?=[A-Za-z0-9]{5,15}$)(?=.*[A-Z])(?=.*[0-9]).*$/g;
  return passwordRegex.test(password)
}