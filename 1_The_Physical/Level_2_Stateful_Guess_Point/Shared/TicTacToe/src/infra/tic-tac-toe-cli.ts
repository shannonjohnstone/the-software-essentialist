import readline from "readline";
import { TicTacToe } from "../domain/tic-tac-toe/tic-tac-toe";

export function getPlayerInput(player: string): Promise<number> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`Player ${player}, enter your move (0-8): `, (answer) => {
      rl.close();
      resolve(parseInt(answer, 10));
    });
  });
}

export class TicTacToeCli {
  static async start() {
    const game = TicTacToe.start();
    while (!game.getGameStatus.isOver) {
      const position = await getPlayerInput(game.getCurrentPlayer);

      const result = game.makeMove(position);

      if (result.error?.code) {
        console.log(`Please try again ${result.error.code}`, result.error);
        continue;
      }

      if (game.getGameStatus.isOver) {
        const { player } = game.getGameStatus;
        if (player) {
          console.log(`Player ${player} is the winner`);
        } else {
          console.log("Try again, its a tie!");
        }
      }
    }
  }
}
