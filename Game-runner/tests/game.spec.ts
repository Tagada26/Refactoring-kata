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
      originalConsoleLog(message);
    };
  });
  afterEach(() => {
    console.log = originalConsoleLog;
  });

  it.only("should ", function () {

    // const arbData = (size: number, max: number = Number.MAX_SAFE_INTEGER) =>
    // fc.array(fc.integer(1, max), size, size);
    fc.assert(
      fc.property(arbitraryNumbersGenerator, (randomNumbers) => {
        const filteredNumbers = randomNumbers.filter(value => value !== 1);
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

        logHistory = [];
        GameRunner.main();

        const oldGameRunnerLogHistory = [...logHistory];
        logHistory = [];
        NewGameRunner.main();
        

        //Then
        expect(logHistory).toEqual(oldGameRunnerLogHistory);
      })
    , {numRuns: 50});
  });
});
