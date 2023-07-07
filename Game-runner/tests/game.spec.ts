import {GameRunner} from '../src/game-runner';

describe('The test environment', () => {
    it('should pass', () => {
        expect(true).toBeTruthy();
    });

    it("should access game", function () {
        expect(GameRunner).not.toBeUndefined();
    });
    it("should excute main()", function () {
        GameRunner.main();
    });

});
