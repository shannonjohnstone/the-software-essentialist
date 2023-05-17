interface Game {
  getGameStatus: {
    isOver: boolean;
    winner?: string;
  };
  getCurrentPlayer: string;
  makeMove(position: number): {
    error?: {
      code: string;
    };
  };
}

type GetPlayerInput = (prompt: string) => Promise<number>;

export class PlayGameUseCase<T extends Game> {
  constructor(private start: () => T, private getPlayerInput: GetPlayerInput) { }

  async execute() {
    const game = this.start();

    while (!game.getGameStatus.isOver) {
      const position = await this.getPlayerInput(
        `Player ${game.getCurrentPlayer}, enter your move (0-8): `
      );

      const result = game.makeMove(position);

      if (result.error?.code) {
        console.log(`Please try again ${result.error.code}`, result.error);
        continue;
      }

      if (game.getGameStatus.isOver) {
        const { winner } = game.getGameStatus;
        if (winner) {
          console.log(`Player ${winner} is the winner`);
        } else {
          console.log("Try again, its a tie!");
        }
      }
    }
  }
}
