import { Character, CharacterAPI } from '../models/character.model';

export async function getCharactersFullPromise() {
  console.time('promise');
  const characterPromises: Promise<Character>[] = [];
  for (let i = 1; i <= 50; i++) {
    characterPromises.push(
      fetch(`https://rickandmortyapi.com/api/character/${i}`)
        .then(response => response.json())
        .then((character: CharacterAPI) => {
          return {
            id: character.id,
            name: character.name,
            species: character.species,
            image: character.image,
            origin: {
              [character.origin.name]: character.origin.url,
            },
          };
        }),
    );
  }
  return Promise.all(characterPromises);
}

export async function getCharactersFullAwait() {
  console.time('await');
  const characters: Character[] = [];
  for (let i = 1; i <= 50; i++) {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${i}`,
    );
    const character: CharacterAPI = await response.json();
    characters.push({
      id: character.id,
      name: character.name,
      species: character.species,
      image: character.image,
      origin: {
        [character.origin.name]: character.origin.url,
      },
    });
  }
  return characters;
}
