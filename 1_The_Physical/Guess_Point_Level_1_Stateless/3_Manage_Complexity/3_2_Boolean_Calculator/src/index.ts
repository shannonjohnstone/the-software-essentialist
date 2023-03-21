export type CalculatorValues = "TRUE" | "FALSE";
// export type Conditions = "AND";
type Precedence = "NOT" | "AND" | "OR"
export class BooleanCalculator {
  private static precedence = {
    "NOT": 3,
    "AND": 2,
    "OR": 1
  };

  static evaluate(expression: string) {
    const tokens = expression.split(/(\(|\)|NOT|AND|OR|\s+)/).filter(token => token.trim().length > 0);
    let stack: any[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token === "TRUE") {
        stack.push(true);
      } else if (token === "FALSE") {
        stack.push(false);
      } else if (token === "NOT") {
        const operand = stack.pop();
        stack.push(!!operand);
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
      } else if (token === "(") {
        stack.push("(");
      } else if (token === ")") {
        while (stack.length > 1 && stack[stack.length - 2] !== "(") {
          const operand2 = stack.pop();
          const condition = stack.pop();
          const operand3 = stack.pop();
          const result = (condition === "AND") ? operand2 === operand3 : operand3 || operand2;

          stack.push(result);
        }
        // stack.pop(); // pop the "(" symbol
      }
    }

    stack = stack.filter(item => item !== "(" && item !== ")").reverse()

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