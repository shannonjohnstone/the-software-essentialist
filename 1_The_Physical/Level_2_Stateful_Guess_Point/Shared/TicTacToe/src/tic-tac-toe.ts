enum Players {
  "X" = "X",
  "O" = "O",
}

type Player = `${Players}`;

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

  makeMove(position: number) {
    const player = this.getCurrentPlayer;

    if (!this.board[position]) {
      this.board[position] = player;
      this.currentPlayer = player === Players.X ? Players.O : Players.X;
    } else {
      // Come back to handling error
    }
  }

  get getWinner(): Player | null {
    for (const [a, b, c] of this.winningPositions) {
      const firstPosition = this.board[a];
      if (
        firstPosition &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return this.board[a];
      }
    }

    return null;
  }

  get gameStatus(): { isOver: boolean; player?: Player } {
    const allPositionsTaken = !this.board.includes(null);

    if (this.getWinner) {
      return { isOver: true, player: this.getWinner };
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

  getPlayerAtPostion(position: number) {
    return this.board[position];
  }
}