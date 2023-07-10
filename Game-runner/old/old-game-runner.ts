import { Game } from "./old-name";

export class GameRunner {
  public static main(): void {
    const game = new Game();
    game.add("Chet");
    game.add("Pat");
    game.add("Sue");

    let notAWinner;
    do {
      game.roll(Math.floor(GameRunner.getRandomNumber() * 6) + 1);
      if (Math.floor(GameRunner.getRandomNumber() * 10) == 7) {
        notAWinner = game.wrongAnswer();
      } else {
        notAWinner = game.wasCorrectlyAnswered();
      }
    } while (notAWinner);
  }

  public static getRandomNumber() {
    return Math.random();
  }
}

// GameRunner.main();
