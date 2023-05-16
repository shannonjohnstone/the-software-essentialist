
export class TicTacToe {
  readonly board: unknown[]

  constructor() {
    this.board = Array(9).fill(null)
  }

  static start() {
    return new TicTacToe()
  }

  get getBoardLength() {
    return this.board.length
  }
}