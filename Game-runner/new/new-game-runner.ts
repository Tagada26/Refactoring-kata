import { Game } from "./new-game";

export class GameRunner {
  public static main(): void {
    const game = new Game();
    game.add("Chet");
    game.add("Pat");
    game.add("Sue");

    let winner;
    do {
      game.roll(Math.floor(GameRunner.getRandomNumber() * 6) + 1);
      if (Math.floor(GameRunner.getRandomNumber() * 10) === 7) {
        winner = game.handleWrongAnswer();
      } else {
        winner = game.handleCorrectAnswer();
      }
    } while (!winner);
  }
  public static getRandomNumber() {
    return Math.random();
  }
}

// GameRunner.main();
