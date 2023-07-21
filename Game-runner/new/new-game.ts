export class Game {
  private players: Array<string> = [];
  private playerPositions: Array<number> = [];
  private playerScores: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayerIndex: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push(`Pop Question ${i}`);
      this.scienceQuestions.push(`Science Question ${i}`);
      this.sportsQuestions.push(`Sports Question ${i}`);
      this.rockQuestions.push(`Rock Question ${i}`);
    }
  }

  public add(name: string): boolean {
    this.players.push(name);
    this.playerPositions[this.numberOfPlayers] = 0;
    this.playerScores[this.numberOfPlayers] = 0;
    this.inPenaltyBox[this.numberOfPlayers] = false;

    console.log(`${name} was added`);
    console.log(`They are player number ${this.numberOfPlayers}`);

    return true;
  }

  private get numberOfPlayers(): number {
    return this.players.length;
  }
  private get currentPlayer(): string {
    return this.players[this.currentPlayerIndex];
  }
  private get currentPlayerPosition(): number {
    return this.playerPositions[this.currentPlayerIndex];
  }

  public roll(roll: number) {
    console.log(`${this.currentPlayer} is the current player`);
    console.log(`They have rolled a ${roll}`);

    const penaltyBoxStatus = this.updatePlayerPenaltyBoxStatus(roll);
    if (penaltyBoxStatus === 'in') {
      return;
    }
    this.movePlayer(roll);
    this.askQuestion();
  }

  

  private updatePlayerPenaltyBoxStatus(roll: number): 'in' | 'out' {
    if (this.inPenaltyBox[this.currentPlayerIndex]) {
      if (roll % 2 === 0) {
        console.log(
          `${this.currentPlayer} is not getting out of the penalty box`
        );
        this.isGettingOutOfPenaltyBox = false;
        return 'in';
      }

      this.isGettingOutOfPenaltyBox = true;
      console.log(`${this.currentPlayer} is getting out of the penalty box`);
    }
    return 'out';
  }

  private movePlayer(roll: number) {
    this.playerPositions[this.currentPlayerIndex] = this.playerPositions[this.currentPlayerIndex] + roll;
    if (this.playerPositions[this.currentPlayerIndex] > 11) {
      this.playerPositions[this.currentPlayerIndex] = this.playerPositions[this.currentPlayerIndex] - 12;
    }
    console.log(
      `${this.currentPlayer}'s new location is ${this.currentPlayerPosition}`
    );
  }

  private askQuestion(): void {
    console.log(`The category is ${this.currentCategory()}`);
    if (this.currentCategory() == "Pop") {
      console.log(this.popQuestions.shift());
    }
    if (this.currentCategory() == "Science") {
      console.log(this.scienceQuestions.shift());
    }
    if (this.currentCategory() == "Sports") {
      console.log(this.sportsQuestions.shift());
    }
    if (this.currentCategory() == "Rock") {
      console.log(this.rockQuestions.shift());
    }
  }

  private currentCategory(): string {
    if (this.currentPlayerPosition == 0) {
      return "Pop";
    }
    if (this.currentPlayerPosition == 4) {
      return "Pop";
    }
    if (this.currentPlayerPosition == 8) {
      return "Pop";
    }
    if (this.currentPlayerPosition == 1) {
      return "Science";
    }
    if (this.currentPlayerPosition == 5) {
      return "Science";
    }
    if (this.currentPlayerPosition == 9) {
      return "Science";
    }
    if (this.currentPlayerPosition == 2) {
      return "Sports";
    }
    if (this.currentPlayerPosition == 6) {
      return "Sports";
    }
    if (this.currentPlayerPosition == 10) {
      return "Sports";
    }
    return "Rock";
  }

  private didPlayerWin(): boolean {
    return !(this.playerScores[this.currentPlayerIndex] == 6);
  }

  public handleWrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(`${this.currentPlayer} was sent to the penalty box`);
    this.inPenaltyBox[this.currentPlayerIndex] = true;

    this.currentPlayerIndex += 1;
    if (this.currentPlayerIndex == this.numberOfPlayers)
      this.currentPlayerIndex = 0;
    return true;
  }

  public handleCorrectAnswer(): boolean {
    if (this.inPenaltyBox[this.currentPlayerIndex]) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!");
        this.playerScores[this.currentPlayerIndex] += 1;
        console.log(
          `${this.currentPlayer} now has ${
            this.playerScores[this.currentPlayerIndex]
          } Gold Coins.`
        );

        var winner = this.didPlayerWin();
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this.numberOfPlayers) {
          this.currentPlayerIndex = 0;
        }

        return winner;
      } else {
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this.numberOfPlayers) {
          this.currentPlayerIndex = 0;
        }
        return true;
      }
    } else {
      console.log("Answer was corrent!!!!");

      this.playerScores[this.currentPlayerIndex] += 1;
      console.log(
        `${this.currentPlayer} now has ${
          this.playerScores[this.currentPlayerIndex]
        } Gold Coins.`
      );

      var winner = this.didPlayerWin();

      this.currentPlayerIndex += 1;
      if (this.currentPlayerIndex == this.numberOfPlayers) {
        this.currentPlayerIndex = 0;
      }

      return winner;
    }
  }
}
