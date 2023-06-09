import { TennisGame } from "./TennisGame";

export class TennisGame2 implements TennisGame {
  player1Points: number = 0;
  player2Points: number = 0;

  constructor(_player1Name: string, _player2Name: string) {}

  getScore(): string {
    let score: string = "";
    score = `${translatePoints(this.player1Points)}-${translatePoints(
      this.player2Points
    )}`;

    if (this.player1Points === this.player2Points && this.player1Points < 4) {
      score = translatePoints(this.player1Points);
      score += "-All";
    }
    if (this.player1Points === this.player2Points && this.player1Points >= 3) {
      score = "Deuce";
    }

    if (this.player1Points > this.player2Points && this.player2Points >= 3) {
      score = "Advantage player1";
    }

    if (this.player2Points > this.player1Points && this.player1Points >= 3) {
      score = "Advantage player2";
    }

    if (
      this.player1Points >= 4 &&
      this.player2Points >= 0 &&
      this.player1Points - this.player2Points >= 2
    ) {
      score = "Win for player1";
    }
    if (
      this.player2Points >= 4 &&
      this.player1Points >= 0 &&
      this.player2Points - this.player1Points >= 2
    ) {
      score = "Win for player2";
    }
    return score;
  }

  wonPoint(player: string): void { player === "player1" ? this.player1Points++ : this.player2Points++ 
}
}

function translatePoints(playerPoints: number): string {
  if (playerPoints === 0) {
    return "Love";
  }
  if (playerPoints === 1) {
    return "Fifteen";
  }
  if (playerPoints === 2) {
    return "Thirty";
  }
  if (playerPoints === 3) {
    return "Forty";
  }
  return "value not use";
}
