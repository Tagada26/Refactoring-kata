import { TennisGame } from "./TennisGame";

export class TennisGame1 implements TennisGame {
  private player1Points: number = 0;
  private player2Points: number = 0;

  constructor(_player1Name: string, _player2Name: string) {}

  wonPoint(playerName: string): void { playerName === "player1" ?  this.player1Points += 1 : this.player2Points += 1 }
  
  getScore(): string {
    if (this.player1Points === this.player2Points) {
      return scoreWhenTie(this.player1Points);
    }
    if (this.player1Points >= 4 || this.player2Points >= 4) {
      const differenceOfPointsBetweenPlayers: number =
        this.player1Points - this.player2Points;
      return scoreInEndOfMatch(differenceOfPointsBetweenPlayers);
    }
    return `${translatePlayerPoints(this.player1Points)}-${translatePlayerPoints(this.player2Points)}`;
  }
}

const scoreInEndOfMatch = (differenceOfPointsBetweenPlayers: number) => {
  if (differenceOfPointsBetweenPlayers === 1) {
    return "Advantage player1";
  } else if (differenceOfPointsBetweenPlayers === -1) {
    return "Advantage player2";
  } else if (differenceOfPointsBetweenPlayers >= 2) {
    return "Win for player1";
  } else {
    return "Win for player2";
  }
}
const scoreWhenTie = (player1Point: number): string => {
  switch (player1Point) {
    case 0:
      return "Love-All";
    case 1:
      return "Fifteen-All";
    case 2:
      return "Thirty-All";
    default:
      return "Deuce";
  }
}

const translatePlayerPoints = (playerPoints: number): string => {
  switch (playerPoints) {
    case 0:
      return "Love";
    case 1:
      return "Fifteen";
    case 2:
      return "Thirty";
    case 3:
      return "Forty";
    default:
      throw new Error("player points is not in a valid range");
  }
}
