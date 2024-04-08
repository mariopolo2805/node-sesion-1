const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/file-csv':
      fs.readFile('./assets/files/users.csv', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error al leer el archivo CSV.');
        }
        res.writeHead(200, { 'Content-Type': 'text/csv' });
        res.end(data);
      });
      break;
    case '/file-json':
      fs.readFile('./assets/files/users.json', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error al leer el archivo JSON.');
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('NotFound');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Servidor escuchando en <http://localhost:3000>');
});
