import { GameRunner } from "../old/old-game-runner";
import { GameRunner as NewGameRunner } from "../new/new-game-runner";
import * as fc from "fast-check";

const randomNumber = fc.integer({ min: 0, max: 999}).noBias().map(value => value / 1_000);
const arbitraryNumbersGenerator = fc.array(randomNumber, {
  minLength: 200,
  maxLength: 1000,
});

describe("The test environment", () => {
  let logHistory: string[] = [];
  let originalConsoleLog: (message: any) => void;

  beforeEach(() => {
    logHistory = [];
    originalConsoleLog = console.log;
    console.log = (message: string) => {
      logHistory.push(message);
      //originalConsoleLog(message);
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

  it.only("should ", function () {
    let logHistory: string[] = [];
    // const arbData = (size: number, max: number = Number.MAX_SAFE_INTEGER) =>
    // fc.array(fc.integer(1, max), size, size);
    fc.assert(
      fc.property(arbitraryNumbersGenerator, (randomNumbers) => {
        const filteredNumbers = randomNumbers.filter(value => value !== 1);
        originalConsoleLog(filteredNumbers);
        const buildRandomNumbers = () => {
          let num = 0;
          return () => {
            const result = filteredNumbers[num % filteredNumbers.length];
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
    , {numRuns: 100});
  });
});

// const randoms = [
//   0.32, 0.14, 0.08, 0.94, 0.62, 0.63, 0.86, 0.80, 0.87, 0.15, 0.27, 0.25, 0.94, 0.18, 0.92, 0.73,
//   0.71, 0.13, 0.67, 0.27, 0.96, 0.63, 0.49, 0.81, 0.92, 0.99, 0.57, 0.07, 0.47, 0.30, 0.97, 0.99, 0.89, 0.78,
//   0.83, 0.80, 0.76, 0.97, 0.46, 0.08, 0.09, 0.02, 0.55, 0.50, 0.82, 0.78, 0.36, 0.69, 0.20, 0.65, 0.36, 0.39,
//   0.98, 0.21, 0.62, 0.11, 0.75, 0.32, 0.82, 0.56, 0.08, 0.71, 0.55, 0.74, 0.78, 0.64, 0.85, 0.00, 0.40, 0.93,
//   0.39, 0.93, 0.82, 0.40, 0.77, 0.04, 0.12, 0.65, 0.36, 0.51, 0.29, 0.95, 0.77, 0.46, 0.08, 0.87, 0.60, 0.64,
//   0.96, 0.60, 0.23, 0.67, 0.52, 0.22, 0.61, 0.72, 0.67, 0.43, 0.19, 0.14];
// let run: number;
// let i: number;

// function fakeRandom() {
//   i = (i + 1) % 100;
//   return randoms[i];
// }

// for (run = 0; run < 10; run += 1) {
//   i = run * 10;
//   GameRunner.main(fakeRandom);
// }

// npm run test -- game.spec.js
