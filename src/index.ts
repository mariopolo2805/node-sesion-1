import http from 'http';
import { Character, CharacterAPI } from './models/character.model';

const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === '/characters') {
      try {
        const response = await fetch(
          'https://rickandmortyapi.com/api/character',
        );
        const data = await response.json();
        const characters: Character[] = data.results.map(
          (character: CharacterAPI) => {
            return {
              id: character.id,
              name: character.name,
              species: character.species,
              image: character.image,
              origin: {
                [character.origin.name]: character.origin.url,
              },
            };
          },
        );
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(characters));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  },
);

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
