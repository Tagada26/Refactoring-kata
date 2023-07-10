import {GameRunner} from '../old/old-game-runner';
import {GameRunner as NewGameRunner } from '../new/new-game-runner';
import * as fc from 'fast-check';

const arbNumber = fc.float({min: 0, max: 1});

describe('The test environment', () => {
    let logHistory: string[] = [];
    let originalConsoleLog: (message: any) => void
    
    beforeEach(() => {
        logHistory = [];
        originalConsoleLog = console.log
        console.log = (message: string) => { 
            logHistory.push(message)
            originalConsoleLog('xxx' + message) 
        }
    })
    afterEach (() => { 
        console.log = originalConsoleLog 
    })
    it('should pass', () => {
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
        GameRunner.main()
    });
    it("should ", function () {
        GameRunner.getRandomNumber = () => {return 2}
        NewGameRunner.getRandomNumber = () => {return 2}
        GameRunner.main()
        //originalConsoleLog(logHistory.join( "\n")) 
        const oldGameRunnerLogHistory = [...logHistory];
        logHistory = [];
        NewGameRunner.main()

        console.table(logHistory)
        expect(logHistory[0]).toEqual(oldGameRunnerLogHistory[0])
        expect(logHistory).toEqual(expect.arrayContaining(oldGameRunnerLogHistory))
    });
    it("should ", function () {
        fc.assert(
            fc.property(arbNumber, (number) => {
                // GameRunner.getRandomNumber = () => {return number}
                // NewGameRunner.getRandomNumber = () => {return number}

                // Faire un tableau de random number et se baser sur l'indice pour aller chercher les mêmes nombre dans game runner. 


                GameRunner.main()
                //originalConsoleLog(logHistory.join( "\n")) 
                const oldGameRunnerLogHistory = [...logHistory];
                logHistory = [];
                NewGameRunner.main()
        
                console.table(logHistory)
                expect(logHistory[0]).toEqual(oldGameRunnerLogHistory[0])
                expect(logHistory).toEqual(expect.arrayContaining(oldGameRunnerLogHistory))
            })
        ) 
    });
});
