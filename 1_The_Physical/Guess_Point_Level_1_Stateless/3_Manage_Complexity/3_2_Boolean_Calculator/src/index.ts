type Precedence = "NOT" | "AND" | "OR"

enum ExpressionsToken {
  TRUE = "TRUE",
  FALSE = "FALSE",
  NOT = "NOT",
  AND = "AND",
  OR = "OR",
  OPEN = "(",
  CLOSE = ")",
}

export class BooleanCalculator {
  private static precedence = {
    "NOT": 3,
    "AND": 2,
    "OR": 1
  };

  private static resolveExpression(stack: unknown[]): unknown[] {
    const [operand1, condition, operand2, ...rest] = [...stack].reverse();
    const result = (condition === ExpressionsToken.AND) ? operand1 === operand2 : operand2 || operand1;

    return [...rest.reverse(), result]
  }

  static evaluate(expression: string): boolean {
    const tokens = expression.split(/(\(|\)|NOT|AND|OR|\s+)/).filter(token => token.trim().length > 0);

    let stack: any[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token === ExpressionsToken.TRUE) {
        stack.push(true);
      } else if (token === ExpressionsToken.FALSE) {
        stack.push(false);
      } else if (token === ExpressionsToken.NOT) {
        const operand = stack.pop();
        stack.push(!!operand);
      } else if (token === ExpressionsToken.AND || token === ExpressionsToken.OR) {
        const precedenceValue = stack[stack.length - 2] as unknown as Precedence;

        while (stack.length > 1 && BooleanCalculator.precedence[precedenceValue] >= BooleanCalculator.precedence[token]) {
          stack = BooleanCalculator.resolveExpression([...stack])
        }
        stack.push(token);
      } else if (token === ExpressionsToken.OPEN) {
        stack.push(ExpressionsToken.OPEN);
      } else if (token === ExpressionsToken.CLOSE) {
        while (stack.length > 1 && stack[stack.length - 2] !== ExpressionsToken.OPEN) {
          stack = BooleanCalculator.resolveExpression([...stack])
        }
      }
    }

    stack = stack.filter(item => item !== ExpressionsToken.OPEN && item !== ExpressionsToken.CLOSE).reverse()

    while (stack.length > 1) {
      const newStack = BooleanCalculator.resolveExpression([...stack])
      stack = newStack
    }

    return stack.pop();
  }
}