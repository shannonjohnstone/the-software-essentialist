import { PlayGameUseCase } from "../../useCases/play-game";
import { TicTacToe } from "../../domain/tic-tac-toe/tic-tac-toe";
import { PromptCli } from "../../../infra/prompt-cli";

export const playTicTacToe = new PlayGameUseCase<TicTacToe>(
  TicTacToe.start,
  PromptCli.prompt
);
