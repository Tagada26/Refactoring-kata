import { Game, PlayerStatus } from "./new-game";

export class GameRunner {
  public static main(): void {
    const game = new Game();
    game.add("Chet");
    game.add("Pat");
    game.add("Sue");

    let playerStatus: PlayerStatus;
    do {
      game.roll(Math.floor(GameRunner.getRandomNumber() * 6) + 1);
      if (Math.floor(GameRunner.getRandomNumber() * 10) === 7) {
        playerStatus = game.handleWrongAnswer();
      } else {
        playerStatus = game.handleCorrectAnswer();
      }
    } while (playerStatus !== 'winner');
  }
  public static getRandomNumber() {
    return Math.random();
  }
}

// GameRunner.main();
