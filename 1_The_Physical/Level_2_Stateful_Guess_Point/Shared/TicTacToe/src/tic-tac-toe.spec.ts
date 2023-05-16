import { TicTacToe } from "./tic-tac-toe";

describe("Given a game is started", () => {
  it("Then a game instance should create", () => {
    const game = TicTacToe.start();

    expect(game).toBeInstanceOf(TicTacToe);
  });
});

describe("Given a game is started", () => {
  it("Then is 9 spaces on the board", () => {
    const game = TicTacToe.start();

    expect(game.getAmountOfBoardSquares).toEqual(9);
  });
});

describe("Given a game is started", () => {
  it("Then player X is the current player", () => {
    const game = TicTacToe.start();

    expect(game.getCurrentPlayer).toEqual("X");
  });
});

describe("Given a game is started", () => {
  it("Then player X makes the first move in position 0", () => {
    const game = TicTacToe.start();

    game.makeMove(0);

    expect(game.getPlayerAtPostion(0)).toEqual("X");
  });
});
