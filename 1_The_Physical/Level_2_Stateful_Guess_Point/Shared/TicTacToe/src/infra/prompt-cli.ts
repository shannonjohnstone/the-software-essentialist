import readline from "readline";

export class PromptCli {
  static async prompt(prompt: string): Promise<number> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        rl.close();
        resolve(parseInt(answer, 10));
      });
    });
  }
}
