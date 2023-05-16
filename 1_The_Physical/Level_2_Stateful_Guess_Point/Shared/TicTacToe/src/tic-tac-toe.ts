enum Players {
  "X" = "X",
  "O" = "O",
}

type Player = `${Players}`;

export class TicTacToe {
  public board: (Player | null)[];
  readonly currentPlayer: Player = Players.X;

  constructor() {
    this.board = Array(9).fill(null);
  }

  static start() {
    return new TicTacToe();
  }

  makeMove(position: number) {
    const player = this.getCurrentPlayer;

    if (!this.board[position]) {
      this.board[position] = player;
    }
  }

  get getAmountOfBoardSquares() {
    return this.board.length;
  }

  get getCurrentPlayer() {
    return this.currentPlayer;
  }

  getPlayerAtPostion(position: number) {
    return this.board[position];
  }
}
