import { Result } from "../../shared/result";

enum Players {
  "X" = "X",
  "O" = "O",
}

type Player = `${Players}`;

interface Error {
  code: string;
  validations: { code: string; message: string }[];
}

export class TicTacToe {
  private board: (Player | null)[];
  private currentPlayer: Player = Players.X;
  private winningPositions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  constructor() {
    this.board = Array(9).fill(null);
  }

  static start() {
    return new TicTacToe();
  }

  validate(position: number): Error | undefined {
    if (position < 0 || position > this.board.length) {
      return {
        code: "INVALID_MOVE",
        validations: [
          {
            code: "POSITION_OUTSIDE_BOARD_RANGE",
            message: "Position is outside the range of the current board.",
          },
        ],
      };
    }

    if (this.board[position]) {
      return {
        code: "INVALID_MOVE",
        validations: [
          { code: "POSITION_TAKEN", message: "Position already taken." },
        ],
      };
    }
  }

  makeMove(
    position: number
  ): Result<{ player: Player; position: number }, Error> {
    const player = this.getCurrentPlayer;
    const error = this.validate(position);

    if (error) {
      return Result.fail(error);
    }

    this.board[position] = player;
    this.currentPlayer = player === Players.X ? Players.O : Players.X;
    return Result.ok({ player, position });
  }

  getPlayerAtPostion(position: number) {
    return this.board[position];
  }

  get getWinner(): Player | null {
    for (const [a, b, c] of this.winningPositions) {
      const firstPosition = this.board[a];
      if (
        firstPosition &&
        firstPosition === this.board[b] &&
        firstPosition === this.board[c]
      ) {
        return this.board[a];
      }
    }

    return null;
  }

  get getGameStatus(): { isOver: boolean; winner?: Player } {
    const allPositionsTaken = !this.board.includes(null);

    if (this.getWinner) {
      return { isOver: true, winner: this.getWinner };
    }

    return allPositionsTaken && !this.getWinner
      ? { isOver: true }
      : { isOver: false };
  }

  get getAmountOfBoardSquares() {
    return this.board.length;
  }

  get getCurrentPlayer() {
    return this.currentPlayer;
  }
}
