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
    if (penaltyBoxStatus === "in") {
      return;
    }
    this.movePlayer(roll);
    this.askQuestion();
  }

  private updatePlayerPenaltyBoxStatus(roll: number): "in" | "out" {
    if (this.inPenaltyBox[this.currentPlayerIndex]) {
      if (roll % 2 === 0) {
        console.log(
          `${this.currentPlayer} is not getting out of the penalty box`
        );
        this.isGettingOutOfPenaltyBox = false;
        return "in";
      }

      this.isGettingOutOfPenaltyBox = true;
      console.log(`${this.currentPlayer} is getting out of the penalty box`);
    }
    return "out";
  }

  private movePlayer(roll: number) {
    this.playerPositions[this.currentPlayerIndex] =
      this.playerPositions[this.currentPlayerIndex] + roll;
    if (this.playerPositions[this.currentPlayerIndex] > 11) {
      this.playerPositions[this.currentPlayerIndex] =
        this.playerPositions[this.currentPlayerIndex] - 12;
    }
    console.log(
      `${this.currentPlayer}'s new location is ${this.currentPlayerPosition}`
    );
  }

  private askQuestion(): void {
    const currentCategory = this.currentCategory();
    console.log(`The category is ${currentCategory}`);

    switch (currentCategory) {
      case "Pop":
        console.log(this.popQuestions.shift());
        break;
      case "Science":
        console.log(this.scienceQuestions.shift());
        break;
      case "Sports":
        console.log(this.sportsQuestions.shift());
        break;
      case "Rock":
        console.log(this.rockQuestions.shift());
        break;
    }
  }

  private currentCategory(): string {
    const categories = ["Pop", "Science", "Sports", "Rock"];
    return (
      categories[this.currentPlayerPosition % categories.length] ||
      categories[categories.length - 1]
    );
  }

  private didPlayerWin(): boolean {
    return (this.playerScores[this.currentPlayerIndex] === 6);
  }

  public handleWrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(`${this.currentPlayer} was sent to the penalty box`);
    this.inPenaltyBox[this.currentPlayerIndex] = true;

    this.changeForNextPlayer();
    return false;
  }

  private changeForNextPlayer() {
    this.currentPlayerIndex += 1;
    if (this.currentPlayerIndex === this.numberOfPlayers) {
      this.currentPlayerIndex = 0;
    }
  }

  public handleCorrectAnswer(): boolean {
    const isPlayerTrappedInPenaltyBox =
      this.inPenaltyBox[this.currentPlayerIndex] &&
      !this.isGettingOutOfPenaltyBox;

    if (isPlayerTrappedInPenaltyBox) {
      this.changeForNextPlayer();
      return false;
    }

    console.log("Answer was correct!!!!");

    this.playerScores[this.currentPlayerIndex] += 1;
    console.log(
      `${this.currentPlayer} now has ${
        this.playerScores[this.currentPlayerIndex]
      } Gold Coins.`
    );

    const winner = this.didPlayerWin();
    this.changeForNextPlayer();
    return winner;
  }
}
