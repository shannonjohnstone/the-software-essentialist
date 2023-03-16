const divisibleBy = (divisible: number) => (number: number) => number % divisible === 0

const divisibleBy3 = divisibleBy(3)
const divisibleBy5 = divisibleBy(5)

export function fizzbuzz(numbers: number[]) {
  return numbers.reduce((acc: string, number: number) => {
    if (divisibleBy3(number) && divisibleBy5(number)) return acc += "FizzBuzz";
    if (divisibleBy3(number)) return acc += "Fizz";
    if (divisibleBy5(number)) return acc += "Buzz";
    return acc += number
  }, "")
}