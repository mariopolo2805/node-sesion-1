const fs = require('fs');

// Un array de usuarios
const users = [
  { id: 1, name: 'John', isAdmin: true, age: 30 },
  { id: 2, name: 'Jane', isAdmin: false, age: 25 },
  { id: 3, name: 'Doe', isAdmin: true, age: 33 },
  { id: 4, name: 'Smith', isAdmin: false, age: 40 },
  { id: 5, name: 'Brown', isAdmin: true, age: 35 },
];

// Función auxiliar para convertir un objeto de usuario a formato CSV
const convertUserToCSV = user => {
  return `${user.id};${user.name};${user.isAdmin};${user.age}\n`;
};

// Convierte los usuarios a JSON y escribe en un archivo
const convertToJSON = () => {
  const jsonContent = JSON.stringify(users, null, 2);

  fs.writeFile('./assets/files/users.json', jsonContent, err => {
    if (err) {
      console.error('Error al escribir el archivo JSON:', err);
    } else {
      console.log('Archivo JSON escrito correctamente.');
    }
  });
};

// Convierte los usuarios a CSV y escribe en un archivo
const convertToCSV = () => {
  let csvContent = 'id;name;isAdmin;age\n';

  users.forEach(user => {
    csvContent += convertUserToCSV(user);
  });

  fs.writeFile('./assets/files/users.csv', csvContent, err => {
    if (err) {
      console.error('Error al escribir el archivo CSV:', err);
    } else {
      console.log('Archivo CSV escrito correctamente.');
    }
  });
};

convertToJSON();
convertToCSV();
