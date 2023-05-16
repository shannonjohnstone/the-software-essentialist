import { TicTacToe } from "./tic-tac-toe"

describe('Given a game is started', () => {
  it("Then a game instance should create", () => {
    const game = TicTacToe.start()

    expect(game).toBeInstanceOf(TicTacToe)
  })
})
