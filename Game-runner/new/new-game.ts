export class Game {
  private players: Array<string> = [];
  private playerPositions: Array<number> = [];
  private playerScores: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayer: number = 0;
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
      this.rockQuestions.push(this.createRockQuestion(i));
    }
  }

  private createRockQuestion(index: number): string {
    return `Rock Question ${index}`;
  }

  public add(name: string): boolean {
    this.players.push(name);
    this.playerPositions[this.howManyPlayers()] = 0;
    this.playerScores[this.howManyPlayers()] = 0;
    this.inPenaltyBox[this.howManyPlayers()] = false;

    console.log(`${name} was added`);
    console.log(`They are player number ${this.howManyPlayers()}`);

    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  public roll(roll: number) {
    console.log(`${this.players[this.currentPlayer]} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(
          `${
            this.players[this.currentPlayer]
          } is getting out of the penalty box`
        );
        this.playerPositions[this.currentPlayer] =
          this.playerPositions[this.currentPlayer] + roll;
        if (this.playerPositions[this.currentPlayer] > 11) {
          this.playerPositions[this.currentPlayer] =
            this.playerPositions[this.currentPlayer] - 12;
        }

        console.log(
          `${this.players[this.currentPlayer]}'s new location is ${
            this.playerPositions[this.currentPlayer]
          }`
        );
        console.log(`The category is ${this.currentCategory()}`);
        this.askQuestion();
      } else {
        console.log(
          `${
            this.players[this.currentPlayer]
          } is not getting out of the penalty box`
        );
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.playerPositions[this.currentPlayer] =
        this.playerPositions[this.currentPlayer] + roll;
      if (this.playerPositions[this.currentPlayer] > 11) {
        this.playerPositions[this.currentPlayer] =
          this.playerPositions[this.currentPlayer] - 12;
      }

      console.log(
        `${this.players[this.currentPlayer]}'s new location is ${
          this.playerPositions[this.currentPlayer]
        }`
      );
      console.log("The category is " + this.currentCategory());
      this.askQuestion();
    }
  }

  private askQuestion(): void {
    if (this.currentCategory() == "Pop") console.log(this.popQuestions.shift());
    if (this.currentCategory() == "Science")
      console.log(this.scienceQuestions.shift());
    if (this.currentCategory() == "Sports")
      console.log(this.sportsQuestions.shift());
    if (this.currentCategory() == "Rock")
      console.log(this.rockQuestions.shift());
  }

  private currentCategory(): string {
    if (this.playerPositions[this.currentPlayer] == 0) return "Pop";
    if (this.playerPositions[this.currentPlayer] == 4) return "Pop";
    if (this.playerPositions[this.currentPlayer] == 8) return "Pop";
    if (this.playerPositions[this.currentPlayer] == 1) return "Science";
    if (this.playerPositions[this.currentPlayer] == 5) return "Science";
    if (this.playerPositions[this.currentPlayer] == 9) return "Science";
    if (this.playerPositions[this.currentPlayer] == 2) return "Sports";
    if (this.playerPositions[this.currentPlayer] == 6) return "Sports";
    if (this.playerPositions[this.currentPlayer] == 10) return "Sports";
    return "Rock";
  }

  private didPlayerWin(): boolean {
    return !(this.playerScores[this.currentPlayer] == 6);
  }

  public handleWrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(
      `${this.players[this.currentPlayer]} was sent to the penalty box`
    );
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.howManyPlayers()) this.currentPlayer = 0;
    return true;
  }

  public handleCorrectAnswer(): boolean {
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!");
        this.playerScores[this.currentPlayer] += 1;
        console.log(
          `${this.players[this.currentPlayer]} now has ${
            this.playerScores[this.currentPlayer]
          } Gold Coins.`
        );

        var winner = this.didPlayerWin();
        this.currentPlayer += 1;
        if (this.currentPlayer == this.howManyPlayers()) this.currentPlayer = 0;

        return winner;
      } else {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.howManyPlayers()) this.currentPlayer = 0;
        return true;
      }
    } else {
      console.log("Answer was corrent!!!!");

      this.playerScores[this.currentPlayer] += 1;
      console.log(
        `${this.players[this.currentPlayer]} now has ${
          this.playerScores[this.currentPlayer]
        } Gold Coins.`
      );

      var winner = this.didPlayerWin();

      this.currentPlayer += 1;
      if (this.currentPlayer == this.howManyPlayers()) this.currentPlayer = 0;

      return winner;
    }
  }
}
