export type PlayerStatus = "winner" | "notAWinner";

const BOARD_SIZE = 12;
const CATEGORIES = ["Pop", "Science", "Sports", "Rock"];

type Player = {
  name: string;
  position: number;
  score: number;
  inPenaltyBox: boolean;
};

export class Game {
  private players: Array<Player> = [];
  private currentPlayerIndex: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private questions: Record<string, string[]> = {};

  constructor() {
    for(const category of CATEGORIES) {
      this.questions[category] = [];
      for (let i = 0; i < 50; i++) {
        this.questions[category].push(`${category} Question ${i}`);
      }
    }
  }

  public add(name: string): boolean {
    this.players.push({ name, position: 0, score: 0, inPenaltyBox: false });

    console.log(`${name} was added`);
    console.log(`They are player number ${this.numberOfPlayers}`);

    return true;
  }

  private get numberOfPlayers(): number {
    return this.players.length;
  }
  private get currentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  public roll(roll: number) {
    console.log(`${this.currentPlayer.name} is the current player`);
    console.log(`They have rolled a ${roll}`);

    const penaltyBoxStatus = this.updatePlayerPenaltyBoxStatus(roll);
    if (penaltyBoxStatus === "in") {
      return;
    }
    this.movePlayer(roll);
    this.askQuestion();
  }

  private updatePlayerPenaltyBoxStatus(roll: number): "in" | "out" {
    if (this.currentPlayer.inPenaltyBox) {
      if (roll % 2 === 0) {
        console.log(
          `${this.currentPlayer.name} is not getting out of the penalty box`
        );
        this.isGettingOutOfPenaltyBox = false;
        return "in";
      }

      this.isGettingOutOfPenaltyBox = true;
      console.log(
        `${this.currentPlayer.name} is getting out of the penalty box`
      );
    }
    return "out";
  }

  private movePlayer(roll: number) {
    this.currentPlayer.position =
      (this.currentPlayer.position + roll) % BOARD_SIZE;
    console.log(
      `${this.currentPlayer.name}'s new location is ${this.currentPlayer.position}`
    );
  }

  private askQuestion(): void {
    const currentCategory = this.currentCategory();
    console.log(`The category is ${currentCategory}`);
    console.log(this.questions[currentCategory].shift());
  }

  private currentCategory(): string {
    return (
      CATEGORIES[this.currentPlayer.position % CATEGORIES.length] ||
      CATEGORIES[CATEGORIES.length - 1]
    );
  }

  private didPlayerWin(): PlayerStatus {
    return this.currentPlayer.score === 6 ? "winner" : "notAWinner";
  }

  public handleWrongAnswer(): PlayerStatus {
    console.log("Question was incorrectly answered");
    console.log(`${this.currentPlayer.name} was sent to the penalty box`);
    this.currentPlayer.inPenaltyBox = true;

    this.changeForNextPlayer();
    return "notAWinner";
  }

  private changeForNextPlayer() {
    this.currentPlayerIndex += 1;
    if (this.currentPlayerIndex === this.numberOfPlayers) {
      this.currentPlayerIndex = 0;
    }
  }

  public handleCorrectAnswer(): PlayerStatus {
    const isPlayerTrappedInPenaltyBox =
      this.currentPlayer.inPenaltyBox && !this.isGettingOutOfPenaltyBox;

    if (isPlayerTrappedInPenaltyBox) {
      this.changeForNextPlayer();
      return "notAWinner";
    }

    console.log("Answer was correct!!!!");

    this.currentPlayer.score += 1;
    console.log(
      `${this.currentPlayer.name} now has ${this.currentPlayer.score} Gold Coins.`
    );

    const playerStatus = this.didPlayerWin();
    this.changeForNextPlayer();
    return playerStatus;
  }
}
