export function isPalindrome(string: string) {
  const lowerCaseString = string.toLowerCase()
  const nonCharactersRemoved = lowerCaseString.replace(/[\W_]/g, "")
  const nonCharactersRemovedReversed = nonCharactersRemoved.split("").reverse().join("")

  return nonCharactersRemoved === nonCharactersRemovedReversed
}