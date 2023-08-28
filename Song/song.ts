
export const buildSong = (animals: string[] = ['fly', 'spider', 'bird', 'cat', 'dog', 'cow', 'horse']): string =>  {
    return `There was an old lady who swallowed a ${animals[0]}.
I don't know why she swallowed a ${animals[0]} - perhaps she'll die!

There was an old lady who swallowed a ${animals[1]};
That wriggled and wiggled and tickled inside her.
She swallowed the ${animals[1]} to catch the ${animals[0]};
I don't know why she swallowed a ${animals[0]} - perhaps she'll die!

There was an old lady who swallowed a ${animals[2]};
How absurd to swallow a ${animals[2]}.
She swallowed the ${animals[2]} to catch the ${animals[1]},
She swallowed the ${animals[1]} to catch the ${animals[0]};
I don't know why she swallowed a ${animals[0]} - perhaps she'll die!

There was an old lady who swallowed a ${animals[3]};
Fancy that to swallow a ${animals[3]}!
She swallowed the ${animals[3]} to catch the ${animals[2]},
She swallowed the ${animals[2]} to catch the ${animals[1]},
She swallowed the ${animals[1]} to catch the ${animals[0]};
I don't know why she swallowed a ${animals[0]} - perhaps she'll die!

There was an old lady who swallowed a ${animals[4]};
What a hog, to swallow a ${animals[4]}!
She swallowed the ${animals[4]} to catch the ${animals[3]},
She swallowed the ${animals[3]} to catch the ${animals[2]},
She swallowed the ${animals[2]} to catch the ${animals[1]},
She swallowed the ${animals[1]} to catch the ${animals[0]};
I don't know why she swallowed a ${animals[0]} - perhaps she'll die!

There was an old lady who swallowed a ${animals[5]};
I don't know how she swallowed a ${animals[5]}!
She swallowed the ${animals[5]} to catch the ${animals[4]},
She swallowed the ${animals[4]} to catch the ${animals[3]},
She swallowed the ${animals[3]} to catch the ${animals[2]},
She swallowed the ${animals[2]} to catch the ${animals[1]},
She swallowed the ${animals[1]} to catch the ${animals[0]};
I don't know why she swallowed a ${animals[0]} - perhaps she'll die!

There was an old lady who swallowed a ${animals[6]}...
...She's dead, of course!`
}
const song = buildSong()

console.log(song)
