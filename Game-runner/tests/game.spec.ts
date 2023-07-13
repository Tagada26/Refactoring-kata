import { GameRunner } from "../old/old-game-runner";
import { GameRunner as NewGameRunner } from "../new/new-game-runner";
import * as fc from "fast-check";

const randomNumber = fc.float({ min: 0, max: 1 });
const arbitraryNumbersGenerator = fc.array(randomNumber, {
  minLength: 5,
  maxLength: 5,
});

describe("The test environment", () => {
  let logHistory: string[] = [];
  let originalConsoleLog: (message: any) => void;

  beforeEach(() => {
    logHistory = [];
    originalConsoleLog = console.log;
    console.log = (message: string) => {
      logHistory.push(message);
      originalConsoleLog(message);
    };
  });
  afterEach(() => {
    console.log = originalConsoleLog;
  });
  it("should pass", () => {
    expect(true).toBeTruthy();
  });

  it("should access game", function () {
    expect(GameRunner).not.toBeUndefined();
  });
  it("should excute main()", function () {
    GameRunner.main(); //?
  });
  it("should ", function () {
    //GameRunner.getRandomNumber = () => {return 2}
    GameRunner.main();
  });
  it("should ", function () {
    GameRunner.getRandomNumber = () => {
      return 2;
    };
    NewGameRunner.getRandomNumber = () => {
      return 2;
    };
    GameRunner.main();
    //originalConsoleLog(logHistory.join( "\n"))
    const oldGameRunnerLogHistory = [...logHistory];
    logHistory = [];
    NewGameRunner.main();

    console.table(logHistory);
    expect(logHistory[0]).toEqual(oldGameRunnerLogHistory[0]);
    expect(logHistory).toEqual(expect.arrayContaining(oldGameRunnerLogHistory));
  });
  it.only("should ", function () {
    let logHistory: string[] = [];
    // const arbData = (size: number, max: number = Number.MAX_SAFE_INTEGER) =>
    // fc.array(fc.integer(1, max), size, size);
    fc.assert(
      fc.property(arbitraryNumbersGenerator, (randomNumbers) => {
        const buildRandomNumbers = () => {
          let num = 0;
          return () => {
            const result = randomNumbers[num % randomNumbers.length];
            num++;
            return result;
          };
        };

        GameRunner.getRandomNumber = buildRandomNumbers();
        NewGameRunner.getRandomNumber = buildRandomNumbers();
        
        // Faire un tableau de random number et se baser sur l'indice pour aller chercher les mêmes nombre dans game runner.
        logHistory = [];
        GameRunner.main();

        const oldGameRunnerLogHistory = [...logHistory];
        logHistory = [];
        NewGameRunner.main();

        //Then
        expect(logHistory).toEqual(oldGameRunnerLogHistory);
      })
    );
  });
  it("should ", function () {
    // const arbData = (size: number, max: number = Number.MAX_SAFE_INTEGER) =>
    // fc.array(fc.integer(1, max), size, size);
    GameRunner.getRandomNumber = () => 0;
    NewGameRunner.getRandomNumber = () => 0;
    // Faire un tableau de random number et se baser sur l'indice pour aller chercher les mêmes nombre dans game runner.

    GameRunner.main();
    //originalConsoleLog(logHistory.join( "\n"))
    const oldGameRunnerLogHistory = [...logHistory];

    logHistory = [];
    NewGameRunner.main();

    //expect(logHistory[0]).toEqual(oldGameRunnerLogHistory[0]);
    expect(logHistory.join("\n")).toEqual(oldGameRunnerLogHistory.join("\n"));
  });
});

// npm run test -- game.spec.js
