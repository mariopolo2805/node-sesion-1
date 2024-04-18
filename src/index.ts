import http from 'http';
import { Character, CharacterAPI } from './models/character.model';
import {
  getCharactersFullPromise,
  getCharactersFullAwait,
} from './controllers/characters';

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
    } else if (req.url?.includes('/charactersFull')) {
      const type = req.url.split('?')[1]?.split('=')[1];
      if (type === 'promise') {
        try {
          const characters = await getCharactersFullPromise();
          console.timeEnd('promise');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(characters));
        } catch (error) {
          console.timeEnd('promise');
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
      } else if (type === 'await') {
        try {
          const characters = await getCharactersFullAwait();
          console.timeEnd('await');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(characters));
        } catch (error) {
          console.timeEnd('await');
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request' }));
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
