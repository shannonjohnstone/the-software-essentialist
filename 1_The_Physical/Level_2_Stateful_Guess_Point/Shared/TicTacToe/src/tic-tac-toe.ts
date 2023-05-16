enum Players {
  X = "X",
  O = "O",
}

type Player = `${Players}`;

export class TicTacToe {
  readonly board: unknown[];
  readonly currentPlayer: Player = Players.X;

  constructor() {
    this.board = Array(9).fill(null);
  }

  static start() {
    return new TicTacToe();
  }

  get getAmountOfBoardSquares() {
    return this.board.length;
  }

  get getCurrentPlayer() {
    return this.currentPlayer;
  }
}
