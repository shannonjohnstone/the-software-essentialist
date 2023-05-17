import exp from "constants";
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

describe("Given player X makes a vald move", () => {
  it("Then current player is now O", () => {
    const game = TicTacToe.start();

    game.makeMove(0);

    expect(game.getCurrentPlayer).toEqual("O");
  });
});

describe("Given player X made winning moves", () => {
  it.each([
    { a: [0, 1, 2], b: [3, 4, 6], expected: { isOver: true, winner: "X" } },
    { a: [3, 4, 5], b: [1, 2, 6], expected: { isOver: true, winner: "X" } },
    { a: [6, 7, 8], b: [1, 2, 4], expected: { isOver: true, winner: "X" } },
    { a: [0, 3, 6], b: [1, 2, 5], expected: { isOver: true, winner: "X" } },
    { a: [1, 4, 7], b: [2, 3, 5], expected: { isOver: true, winner: "X" } },
    { a: [2, 5, 8], b: [1, 3, 6], expected: { isOver: true, winner: "X" } },
    { a: [0, 4, 8], b: [1, 2, 4], expected: { isOver: true, winner: "X" } },
    { a: [2, 4, 6], b: [1, 3, 5], expected: { isOver: true, winner: "X" } },
  ])(
    "Then the game should be in a status of over with a winning player, with the positions of $a and $b have been played",
    ({ a, b, expected }) => {
      const game = TicTacToe.start();

      Array(3)
        .fill(null)
        .forEach((_, index) => {
          game.makeMove(a[index]);
          game.makeMove(b[index]);
        });

      expect(game.getGameStatus).toEqual(expected);
    }
  );

  describe("Given all turns have bee had but no player has 3 in a row", () => {
    it("Then the game is over without a winnder", () => {
      const game = TicTacToe.start();

      game.makeMove(0);
      game.makeMove(1);
      game.makeMove(2);
      game.makeMove(3);
      game.makeMove(4);
      game.makeMove(8);
      game.makeMove(7);
      game.makeMove(6);
      game.makeMove(5);

      expect(game.getGameStatus).toEqual({ isOver: true });
    });
  });

  describe("Given player O tried to make a move in a position already taken", () => {
    it("Then this would be considered an invalid move", () => {
      const game = TicTacToe.start();

      game.makeMove(0);
      const { error } = game.makeMove(0);

      expect(error?.code).toEqual("INVALID_MOVE");
      expect(error).toEqual({
        code: "INVALID_MOVE",
        validations: [
          { code: "POSITION_TAKEN", message: "Position already taken." },
        ],
      });
      expect(game.getCurrentPlayer).toEqual("O");
      expect(game.getPlayerAtPostion(0)).toEqual("X");
    });
  });
});
