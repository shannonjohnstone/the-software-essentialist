export function fizzbuzz(numbers: number[]) {
  return numbers.reduce((acc: string, number: number) => {
    if (number % 3 === 0 && number % 5 === 0) return acc += "FizzBuzz";
    if (number % 3 === 0) return acc += "Fizz";
    if (number % 5 === 0) return acc += "Buzz";
    return acc += number
  }, "")
}