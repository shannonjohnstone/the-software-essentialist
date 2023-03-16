export function fizzbuzz(numbers: number[]) {
  return numbers.reduce((acc: string, number: number) => {
    return number ? acc += "" : "";
  }, "")
}