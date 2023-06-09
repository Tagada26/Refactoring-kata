import { TennisGame } from "./TennisGame";

export class TennisGame3 implements TennisGame {
  private player1Points: number = 0;
  private player2Points: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore(): string {
    const player1Point = this.player1Points
    const player2Point = this.player2Points
    
    if (player1Point < 4 && player2Point < 4 && !(player1Point + player2Point === 6)) {
      const scorePossibilities: string[] = ["Love", "Fifteen", "Thirty", "Forty"];
      const scorePlayer1 = scorePossibilities[player1Point];
      const scorePlayer2 = scorePossibilities[player2Point];
      
      const matchScore = isEquality(player1Point, player2Point )? `${scorePlayer1}-All` : `${scorePlayer1}-${scorePlayer2}`;
      
      return matchScore
    } else {
      if (isEquality(player1Point, player2Point )) return "Deuce";
      const playerWithMorePoints = player1Point > player2Point ? this.player1Name : this.player2Name;
      const matchScore = (player1Point - player2Point) * (player1Point - player2Point) === 1
      ? "Advantage " + playerWithMorePoints
      : "Win for " + playerWithMorePoints;

      return matchScore
    }
  }
  
  wonPoint(playerName: string): void {
    playerName === this.player1Name ? (this.player1Points += 1) : (this.player2Points += 1);
  }
}

const isEquality = (player1Points: number, player2Points: number):boolean => { return player1Points === player2Points}