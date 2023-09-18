const A = 65;
const buildDiamond = (seed: string) => {
    const seedPosition = seed.charCodeAt(0) - 'A'.charCodeAt(0); //?
    let result = '';
    
    for(let i = 0; i <= seedPosition; i++) {
        result += getLetter(i); 
        if(i !== 0 ) {
            result += getLetter(i);
        }
        if(seed !== 'A') {
            result += '\n';
        }
    }

    for(let i = (seedPosition - 1) ; i >= 0 ; i--) {
        result += getLetter(i); 
        if(i !== 0 ) {
            result += getLetter(i);
        }
        if(i !== seedPosition ) {
            result += '\n';
        }
    }

    return result //?
};

describe('build diamond', () => {
    it('should build minimal diamond', () => {
        // when 
        const result = buildDiamond('A')

        //then
        expect(result).toEqual(`A`)
    });

    it('should build diamond with proper letters', () => {
        // when 
        const result = buildDiamond('C')

        //then
        const lines = result.split('\n')
        expect(lines[0]).toEqual(`A`);
        expect(lines[1]).toEqual(`BB`);
        expect(lines[2]).toEqual(`CC`);
        expect(lines[3]).toEqual(`BB`);
    });
})

function getLetter(i: number) {
    return String.fromCharCode(A + i);
}
