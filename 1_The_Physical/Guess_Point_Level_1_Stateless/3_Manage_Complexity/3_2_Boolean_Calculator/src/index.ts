export type CalculatorValues = "TRUE" | "FALSE";
// export type Conditions = "AND";
type Precedence = "NOT" | "AND" | "OR"
export class BooleanCalculator {
  private static valuesMap: { [key: string]: boolean } = {
    true: true,
    false: false,
  }

  private static precedence = {
    "NOT": 3,
    "AND": 2,
    "OR": 1
  };

  private static conditionsMap: { [key: string]: (a: boolean, b: boolean | undefined) => boolean } = {
    and: (a, b = false) => a && b,
    or: (a, b = false) => a || b,
    not: (a, b) => !a
  }

  private static encodeExpressionKeys(expression: string): string[] {
    return expression.split(" ").map((item = "") => item.trim().toLowerCase());
  }

  static evaluate(expression: string) {
    const tokens = expression.split(" ");
    let stack: any[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token === "TRUE") {
        stack.push(true);
      } else if (token === "FALSE") {
        stack.push(false);
      } else if (token === "NOT") {
        const operand = stack.pop();
        stack.push(!operand);
      } else if (token === "AND" || token === "OR") {
        const precedenceValue = stack[stack.length - 2] as unknown as Precedence;

        while (stack.length > 1 && BooleanCalculator.precedence[precedenceValue] >= BooleanCalculator.precedence[token]) {
          const operand2 = stack.pop();
          const condition = stack.pop();
          const operand3 = stack.pop();
          const result = (condition === "AND") ? operand2 === operand3 : operand3 || operand2;
          stack.push(result);
        }
        stack.push(token);
      }
    }

    stack = stack.reverse();
    while (stack.length > 1) {
      const operand2 = stack.pop();
      const condition = stack.pop();
      const operand3 = stack.pop();

      const result = (condition === "AND") ? operand2 === operand3 : operand3 || operand2;
      stack.push(result);
    }
    return stack.pop();
  }
}

BooleanCalculator.evaluate("dasd")