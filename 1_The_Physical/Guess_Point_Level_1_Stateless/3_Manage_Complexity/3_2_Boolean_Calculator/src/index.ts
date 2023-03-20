export class BooleanCalculator {
  private static conditionsMap: { [key: string]: boolean } = {
    true: true,
    false: false,
  }

  static evaluate(condition: "TRUE" | "FALSE") {
    return BooleanCalculator.conditionsMap[condition.toLocaleLowerCase()]
  }
}