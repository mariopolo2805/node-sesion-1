# NODE1 - INTRO

# Introducción

Bienvenidos a este curso de Backend con Node.js, donde vamos a realizar una serie de sesiones para sentar las bases del desarrollo en Back. Veremos como trabajar con un Framework como Express para la construcción de un CRUD, así como algunos de los Middlewares más usados.

Analizaremos los modelos de bases de datos relacionales y no relacionales, profundizaremos sobre la importancia del proceso de autenticación y autorización, para terminar con temas tan diversosos como CI/CD, arquitectura y microservicios.

Se impartirán un total de 10 sesiones, las cuales NO serán grabadas, pero sí estarán desacopladas (por lo que aunque no podamos asistir a una concreta, el resto nos siguen aportando valor). Rogamos guardéis las dudas más relevantes para el final de la sesión (aunque siempre podéis levantar la mano para preguntar algo concreto). ¡Despegamos! 🚀

![Untitled](assets/imgs/Untitled.png)

# NODE

Node.js es un entorno de ejecución de JavaScript construido sobre el motor de JavaScript V8 de Chrome.

- Es utilizado principalmente para construir aplicaciones de servidor, lo que permite a los desarrolladores de JavaScript trabajar en el backend, además de su dominio tradicional en el frontend.
- Node.js utiliza un modelo de programación basado en eventos y non-blocking (asíncrono), lo que lo hace eficiente y ligero, ideal para aplicaciones orientadas a datos en tiempo real que se ejecutan a través de dispositivos distribuidos.
- Es una pieza fundamental para el desarrollo de aplicaciones de JavaScript modernas y la construcción del stack MERN/MEAN.

![Untitled](assets/imgs/Untitled%201.png)

Será importante trabajar siempre con versiones LTS, pensando en que tengan un largo periodo de estabilidad, recibiendo actualizaciones y minimizando las intervenciones en nuestro servidor.

![Untitled](assets/imgs/Untitled%202.png)

## NPM

NPM o Node Package Manager es una herramienta esencial que se usa para instalar y administrar paquetes de Node.js. Podemos inicializar nuestro proyecto Node/NPM mediante:

```
npm init
```

Este comando crea un archivo `package.json` en el directorio actual, que almacena la configuración y las dependencias de nuestro proyecto.

### Dependencias

Nos permite instalar `dependencies` y `devDependencies` para nuestro proyecto, y también ofrece funcionalidades para creación de scripts y ejecutar métodos de depuración.

- Las `dependencies` son los módulos de los que depende su proyecto. Estos se instalan en la carpeta node_modules en su entorno local y se incluyen en el paquete cuando su proyecto se despliega para la producción.
- Por otro lado, las `devDependencies` son los módulos que solo se necesitan durante el desarrollo y las pruebas. No se incluyen cuando se despliega el proyecto para la producción. Esto podría incluir cosas como linters, herramientas de prueba, etc.

Para instalar solo las `dependencies` podemos utilizar el siguiente comando:

```
npm install --omit=dev
```

Gracias a este comando, podemos ahorrarnos unos cuantos cientos de MB en el *server* de PRO.

![Untitled](assets/imgs/Untitled%203.png)

### NVM

Para agilizar los cambios de versiones entre proyectos, es bastante común trabajar con NVM (Node Version Manager). Con NVM, puedes instalar varias versiones de Node.js y cambiar entre ellas con facilidad. Solo funciona en sistemas operativos Unix, como Linux y MacOS. También hay una versión disponible para Windows llamada `nvm-windows`.

![Untitled](assets/imgs/Untitled%204.png)

### NPX

`npx` es una herramienta que se instala automáticamente con npm (a partir de la versión 5.2.0). Permite ejecutar paquetes de Node.js sin necesidad de instalarlos previamente. Este comando es especialmente útil para ejecutar paquetes que se utilizan para tareas de desarrollo, como crear un nuevo proyecto con un generador de código.

![Untitled](assets/imgs/Untitled%205.png)

Gracias a `NPX` y a `NVM` se ha facilitado la gestión de paquetes y versiones en Node.js. `NPX` permite ejecutar paquetes sin necesidad de instalación previa, ideal para desarrollo. Mientras que `NVM` facilita la instalación y cambio entre distintas versiones de Node.js, útil si diferentes proyectos requieren diferentes versiones.

### scripts

Los scripts NPM, son fragmentos de código reutilizables que se pueden ejecutar desde la línea de comandos. Son útiles para automatizar tareas como iniciar el servidor, ejecutar pruebas, construir el código, etc.

Los scripts más comunes son `start` y `test`. Estos scripts tienen una característica especial en NPM, y es que no necesitan la palabra clave `run` para ser ejecutados. Por ejemplo, para el script `start`, simplemente se ejecuta `npm start` en lugar de `npm run start`.

A continuación mostramos cómo se puede configurar un script `hello-world` :

```json
"scripts": {
  "start": "node app.js",
  "test": "jest",
  "hello-world": "echo '¡Hola, mundo!'"
}
```

Para ejecutar este script `hello-world`, debes usar `npm run hello-world` en la línea de comandos. Este comando imprimirá '¡Hola, mundo!' en la consola.

### debugging

Es fundamental tener claro el método de depuración mediante VSCode, para ello lo más cómodo será abrir una terminal del tipo `Javascript Debug Terminal`. De este modo, podremos debuggear como de costumbre en Chrome.

![Untitled](assets/imgs/Untitled%206.png)

### file system

Uno de los puntos más básicos para empezar a hacer `scripting`, sería mediante el sistema de archivos. Node.js proporciona el módulo `fs` (File System) para interactuar con ello en nuestro equipo o a futuro en el servidor.

[File system | Node.js v20.11.1 Documentation](https://nodejs.org/docs/v20.11.1/api/fs.html)

Esto incluye leer, escribir, eliminar archivos y más. Es importante entender cómo trabajar con 'fs' ya que es una parte integral del desarrollo de aplicaciones Node.js.

Veamos un ejemplo de cómo crear un script que utiliza el módulo `fs` para escribir un array de usuarios en un archivo JSON y un archivo CSV:

```jsx
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
const convertUserToCSV = (user) => {
  return `${user.id},${user.name},${user.isAdmin},${user.age}\\n`;
};

// Convierte los usuarios a JSON y escribe en un archivo
const convertToJSON = () => {
  const jsonContent = JSON.stringify(users, null, 2);

  fs.writeFile('users.json', jsonContent, (err) => {
    if (err) {
      console.error('Error al escribir el archivo JSON:', err);
    } else {
      console.log('Archivo JSON escrito correctamente.');
    }
  });
};

// Convierte los usuarios a CSV y escribe en un archivo
const convertToCSV = () => {
  let csvContent = 'id,name,isAdmin,age\\n';

  users.forEach((user) => {
    csvContent += convertUserToCSV(user);
  });

  fs.writeFile('users.csv', csvContent, (err) => {
    if (err) {
      console.error('Error al escribir el archivo CSV:', err);
    } else {
      console.log('Archivo CSV escrito correctamente.');
    }
  });
};

convertToJSON();
convertToCSV();
```

Esto puede sernos de mucha utilidad en servidor, para transformar datos a ficheros, que luego podemos disponer como endpoints para descargar mediante peticiones API REST.

### http

Podemos utilizar el módulo `http` nativo de Node.js para crear un servidor simple que servirá nuestro archivo CSV y JSON:

```jsx
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  switch(req.url) {
    case '/file-csv':
      fs.readFile('users.csv', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          return res.end('Error al leer el archivo CSV.');
        }
        res.writeHead(200, {'Content-Type': 'text/csv'});
        res.end(data);
      });
      break;
    case '/file-json':
      fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          return res.end('Error al leer el archivo JSON.');
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
      });
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('NotFound');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Servidor escuchando en <http://localhost:3000>');
});
```

[HTTP | Node.js v20.11.1 Documentation](https://nodejs.org/docs/v20.11.1/api/http.html)

## Buenas prácticas

A continuación, sentemos algunos puntos de buenas prácticas con respecto a nuestros desarrollos con Node.js en la capa de servidor.

### ESLint + Prettier + Husky + LintStaged

ESLint y Prettier son herramientas fundamentales para mantener la calidad del código.

- ESLint se encarga de detectar y reportar patrones encontrados en el código de JavaScript, lo que ayuda a hacer que nuestro código sea más consistente y evita errores.
- Prettier, por otro lado, es un formateador de código que asegura que todo nuestro código siga un estilo consistente.
- Husky / Lint-staged
    - Husky nos permite utilizar ganchos de git en tu proyecto. Los ganchos de git son scripts que se ejecutan automáticamente cada vez que se produce un evento en Git, como un commit o un push.
    - Lint-staged, nos permite ejecutar linters en archivos que están en el área de staging de Git. Esto significa que sólo se ejecutarán linters en los archivos que has modificado y que están listos para ser committed, en lugar de en todo el proyecto.

**ESLint**

```bash
npm install eslint@8 --save-dev                                                
npx eslint --init                                                                                                               
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · commonjs
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No
✔ Where does your code run? · node
✔ What format do you want your config file to be in? · JavaScript
Successfully created .eslintrc.js file in /Users/user/dev/NODE
```

Podemos ir añadiendo reglas, del tipo:

```jsx
'rules': {
    'semi': [2, 'always'],
    'quotes': ['error', 'single', { 'avoidEscape': true }]
    // ...
}
```

**Prettier**

```bash
npm install prettier eslint-config-prettier --save-dev
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

Rellenamos el archivo `.prettierrc` en la raíz del proyecto:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "avoid"
}
```

Y ampliamos la config de ESLint:

```jsx
extends: [
  'eslint:recommended',
  'prettier'
],
```

**Husky + LintStaged**

```jsx
npm install husky lint-staged --save-dev
npx husky init
echo "npm run pre-commit" > .husky/pre-commit
```

Finalmente, para configurar Husky y lint-staged, añadimos lo siguiente en el `package.json`:

```json
{
  "scripts": {
    "pre-commit": "lint-staged",
  },
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

Esto garantizará que todos los archivos JavaScript sean formateados por Prettier y pasen las comprobaciones de ESLint antes de cada commit.

### Typescript

Otro punto relevante a la hora de arrancar un proyecto, es decidir el lenguaje de programación. Typescript a grandes rasgos, se define como una ampliación de JavaScript, agregando tipado estático, decoradores y demás funcionalidades. Esto hará que nuestro código sea más fácil de entender y predecible.

![Untitled](assets/imgs/Untitled%207.png)

Para iniciar un proyecto con Typescript, primero debemos instalarlo como una dependencia de desarrollo en nuestro proyecto con `npm install typescript --save-dev`. Luego, podemos inicializar un nuevo proyecto de Typescript con `npx tsc --init`, que creará un archivo de configuración `tsconfig.json` en nuestro directorio actual. Podemos personalizar este archivo para ajustar las opciones de compilación de Typescript según nuestras necesidades.

[Node.js — Node.js with TypeScript](https://nodejs.org/en/learn/getting-started/nodejs-with-typescript)

<aside>
⚠️ En primera instancia, se mostrará un error en el `tsconfig.json`, hasta que creemos nuestros primeros ficheros con extensión TS.

</aside>

Por ejemplo, crearemos un pequeño servidor HTTP para que actúe como Backend For Frontend (BFF) y transforme los datos de la API de Rick&Morty, de cara a que los consuma un frontal.

```tsx
import http from 'http';
import { Character, CharacterAPI } from './models/character.model';

const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
  if (req.url === '/characters') {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      const characters: Character[] = data.results.map((character: CharacterAPI) => {
        return {
          id: character.id,
          name: character.name,
          species: character.species,
          image: character.image,
          origin: {
            [character.origin.name]: character.origin.url,
          },
        };
      });
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
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

Con los modelos en Typescript:

```tsx
export interface CharacterAPI {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
  origin: {
    [key: string]: string;
  };
}
```

Ajustaremos el `tsconfig`, el `eslintrc` y los `scripts` de npm:

```tsx
// ...
"outDir": "dist/",
// ...
```

```tsx
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      parserOptions: {
        project: './tsconfig.json',
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: [2, 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    '@typescript-eslint/no-var-requires': ['off'],
  },
};

```

```tsx
// npm install --save-dev @types/node @typescript-eslint/parser @typescript-eslint/eslint-plugin
"server": "node ./dist/",
"build": "tsc -p tsconfig.json",
"lint-staged": {
  "*.ts": // [ <---- recordemos cambiar el scope de ficheros a TS
    "eslint --fix --ext .ts",
    "prettier --write"
  ]
}
```

### Nodemon

Para monitorear cualquier cambio en nuestro código fuente y automáticamente reiniciar el servidor, haremos uso de paquetes tipo `nodemon`. Esto resulta muy útil en nuestro entorno de desarrollo, ya que nos permite reflejar los cambios en tiempo real.

```tsx
// npm install nodemon --save-dev
"dev": "nodemon ./scripts/server.js",
"dev-ts": "nodemon -e ts --exec \"npm run build && npm run server\"",
```

![Untitled](assets/imgs/Untitled%208.png)

# SEMVER

A continuación hablaremos sobre Semantic Versioning (SEMVER), un esquema de versionado que ayuda a manejar las dependencias y evitar los conflictos de versiones en nuestros proyectos. Explicaremos cómo se estructuran las versiones y cómo interpretar los cambios entre ellas.

El formato de versión es `MAJOR.MINOR.PATCH`, teniendo cada uno de estos dígitos un significado:

- `MAJOR`: Incrementos cuando se realizan cambios rupturistas y sin retrocompatibilidad, por ejemplo cambiando endpoints o integraciones en la API.
- `MINOR`: Incrementos cuando se añade funcionalidad de manera compatible. Se pueden añadir nuevas funcionalidades pero no afectan a las existentes.
- `PATCH`: Incrementos cuando se realizan correcciones de errores compatibles. Es decir, se arreglan bugs pero no se añaden ni se eliminan funcionalidades.

![Untitled](assets/imgs/Untitled%209.png)

Para establecer la versión del paquete en Node.js, se puede utilizar el comando `npm version`, seguido del tipo de incremento que se desea hacer. Por ejemplo, si para incrementar la versión `MINOR`, ejecutaríamos el comando `npm version minor`.

```bash
# Para incrementar la versión MAJOR
npm version major

# Para incrementar la versión MINOR
npm version minor

# Para incrementar la versión PATCH
npm version patch
```

Estos comandos actualizarán automáticamente el número de versión en el `package.json` y crearán un commit con los cambios (junto con el tag asociado). Es fundamental seguir estas buenas prácticas en conjunto con `GIT`, para un correcto mantenimiento y evolución.

Existen múltiples paquetes que nos facilitan el proceso de release, generación de changelog (mediante conventional-commit) o preparación de cara a publicación mediante CI/CD, por destacar algunos:

[https://github.com/release-it/release-it](https://github.com/release-it/release-it)

[https://github.com/googleapis/release-please](https://github.com/googleapis/release-please)

# Sistemas Node

Antes de revisar cómo funciona el sistema interno de Node, conviene repasar un par de conceptos clave:

### Pila de Llamadas

La pila de llamadas, también conocida como "stack", es una estructura de datos que registra esencialmente dónde está el programa en el código.

- Cada vez que se llama a una función, se coloca un marco de pila en la parte superior de la pila que registra dónde se debe continuar la ejecución una vez que la función actual completa su ejecución.
- Si se llama a otra función dentro de una función, se coloca otro marco de pila en la parte superior de la pila, y así sucesivamente.

Cuando todas las funciones hayan terminado de ejecutarse, la pila estará vacía.

![Untitled](assets/imgs/Untitled%2010.png)

### Cola de eventos

La cola de eventos, también conocida como "queue", es una estructura de datos donde se almacenan los eventos que están esperando para ser procesados.

- Cuando un evento ocurre (como una operación de E/S completada o un temporizador expirado), el evento se añade a la cola.

Cuando la pila de llamadas está vacía, se toma el próximo evento de la cola y se procesa, lo que implica crear un nuevo marco de pila y empezar a ejecutarlo.

## Event Loop

Con esto en mente, veamos como funciona la maquinaria de Node en su proceso interno:

![Untitled](assets/imgs/Untitled%2011.png)

El motor V8 de JavaScript es el encargado de impulsar las tareas:

1. Cuando una tarea, como una función o un callback, está lista para ejecutarse, el `Event Loop` la coloca en la pila de llamadas (`Call Stack`).
2. Si la tarea en ejecución involucra una operación de bloqueo, como una petición AJAX, un temporizador, o una promesa, esta operación se delega a la `NODE API`, que maneja las operaciones del sistema operativo.
3. Una vez que la `NODE API` ha completado la operación de bloqueo, la función de callback asociada se coloca en la cola de eventos (`Event Queue`).
4. El `Event Loop` constantemente revisa si la pila de llamadas está vacía. Cuando la pila de llamadas se vacía, el `Event Loop` retira la primera tarea de la cola de eventos y la coloca en la pila de llamadas para su ejecución. Este proceso se repite en un ciclo, de ahí el nombre de `Event Loop`.
5. Para operaciones de bloqueo más pesadas, Node.js utiliza hilos de trabajo (`Worker Threads`) para no bloquear el `Event Loop` principal.
6. Una vez que estos `Worker Threads` han terminado su trabajo, ejecutan el callback correspondiente.

Este sistema permite que Node.js maneje múltiples operaciones de manera eficiente, manteniendo el Event Loop desbloqueado y listo para ejecutar más tareas y callbacks.

[Node.js — The Node.js Event Loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)

Este proceso de bucle de eventos, es un componente fundamental de JavaScript que permite la ejecución de código asíncrono.

- Aunque JavaScript es un lenguaje de un solo hilo, el Event Loop permite que JavaScript parezca multihilo al manejar las tareas asíncronas y decidir cuándo ejecutarlas.
- Gracias a esta arquitectura, Node.js puede manejar miles de conexiones simultáneas de forma eficiente, lo que lo convierte en una opción ideal para aplicaciones en tiempo real y servicios de back-end altamente concurrentes.

## Ejemplo sencillo del Event Loop

Imaginemos 2 funciones, `greet()` y `respond().` El resultado de invocar `greet()` es inmediato, pero en el caso de `respond()`, se setea un timer.

![https://miro.medium.com/v2/resize:fit:720/format:webp/1*wX0Xoycn5iMFllNLAFP2hQ.gif](https://miro.medium.com/v2/resize:fit:720/format:webp/1*wX0Xoycn5iMFllNLAFP2hQ.gif)

Al lanzar un timer, este es atendido por la `NODE API`, y su resultado se envía a la `Cola de Eventos`.

![https://miro.medium.com/v2/resize:fit:640/format:webp/1*2VbM32YtSOdvyx0UdZMvbQ.gif](https://miro.medium.com/v2/resize:fit:640/format:webp/1*2VbM32YtSOdvyx0UdZMvbQ.gif)

A continuación, se asegura que la `Pila de Llamadas` está vacía, para extraer de la `Cola de Eventos` la siguiente operación.

![https://miro.medium.com/v2/resize:fit:828/format:webp/1*3eZCk-sjeutaTnKq00CkrA.gif](https://miro.medium.com/v2/resize:fit:828/format:webp/1*3eZCk-sjeutaTnKq00CkrA.gif)

## Event Loop con código

```jsx
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");
bar();
foo();
baz();
```

![https://miro.medium.com/v2/resize:fit:720/format:webp/1*nuTxL493ZTm6BNtApJsmUA.gif](https://miro.medium.com/v2/resize:fit:720/format:webp/1*nuTxL493ZTm6BNtApJsmUA.gif)

## Bloqueo del Event Loop

En Node.js, el Event Loop es responsable de decidir cuándo ejecutar **tareas asíncronas** en el entorno del servidor. Por ello, es muy importante no bloquearlo.

- Si bloqueamos el Event Loop, todas las operaciones del servidor se detendrán hasta que se desbloquee. Esto puede llevar a problemas de rendimiento y latencia.
- Para evitar bloquear el Event Loop, debemos asegurarnos de que todas nuestras operaciones de E/S (como lectura/escritura de archivos, consultas a bases de datos, solicitudes de red) sean asíncronas y de que evitemos los bucles pesados y las operaciones de CPU intensivas.

[Node.js — Don't Block the Event Loop (or the Worker Pool)](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop)

<aside>
👨🏼‍💻 Terminemos la teoría y veamos un ejemplo de código comparando varias peticiones mediante Promise vs Async/Await

</aside>

# Módulos en Node

En Node.js, los módulos son la forma en que se organizan y reutilizan el código. Existen dos sistemas de módulos principales en Node.js: CommonJS (CJS) y ECMAScript Modules (ESM).

## CommonJS

CommonJS es el sistema de módulos estándar en Node.js. Utiliza las funciones `require()` para importar módulos y `module.exports` o `exports` para exportarlos.

```jsx
// Importando un módulo
const modulo = require('./modulo');

// Exportando un módulo
module.exports = modulo;
```

El sistema de módulos CommonJS es síncrono, lo que significa que detiene la ejecución del código mientras carga el módulo. Esto generalmente no es un problema en los entornos de Node.js, ya que los módulos se cargan una vez y se almacenan en caché para su reutilización posterior.

## ECMAScript Modules (ESM)

ECMAScript Modules (ESM) es el sistema de módulos oficial de JavaScript. Utiliza las palabras clave `import` y `export` para manejar los módulos.

```jsx
// Importando un módulo
import modulo from './modulo.mjs';

// Exportando un módulo
export default modulo;

```

A diferencia de CommonJS, ESM es asíncrono, lo que significa que puede cargar módulos sin bloquear la ejecución del código. Esto puede resultar en un mejor rendimiento, especialmente en aplicaciones de gran escala.

<aside>
☝🏼 Sin embargo, el soporte de ESM en Node.js todavía está en fase experimental y requiere la extensión de archivo `.mjs` o configurar la propiedad `"type": "module"` en el archivo `package.json` del proyecto.

</aside>

### Comparativa

- **CommonJS** es ampliamente utilizado y estable en Node.js. Es simple y fácil de usar, pero puede ser menos eficiente para cargas de trabajo grandes debido a su naturaleza síncrona.
- **ESM** es el futuro de la modularización en JavaScript y puede ofrecer un mejor rendimiento debido a su naturaleza asíncrona. Sin embargo, su soporte en Node.js todavía está en desarrollo y puede tener ciertas limitaciones y complejidades adicionales.

![https://lenguajejs.com/automatizadores/introduccion/commonjs-vs-es-modules/commonjs-vs-esm.png](https://lenguajejs.com/automatizadores/introduccion/commonjs-vs-es-modules/commonjs-vs-esm.png)

[Modules: CommonJS modules | Node.js v21.7.3 Documentation](https://nodejs.org/api/modules.html)

# Errores en Node

En un entorno de Node.js, los errores se pueden clasificar en tres categorías: errores estándar de JavaScript, errores específicos de Node.js y errores propios de tu aplicación.

- Los errores estándar de JavaScript son los que probablemente ya conozcas, como `ReferenceError`, `TypeError`, `RangeError`, entre otros.
- Los errores específicos de Node.js son propios del entorno y generalmente están relacionados con operaciones de sistema, como problemas de red, operaciones de archivos, etc.
- Por último, los errores propios de tu aplicación son los que tú mismo defines y lanzas cuando algo va mal en tu lógica de negocio mediante `throw new Error`

Es una buena práctica manejar los errores de manera adecuada en tu aplicación para evitar que la aplicación se bloquee y para proporcionar una respuesta significativa al usuario o al cliente.

## Errores HTTP

Centrémonos en los errores HTTP, que son los que se producen cuando hay un problema con una solicitud de red. Se representan mediante códigos de estado:

- Los códigos de respuesta `2xx` indican que la solicitud fue procesada con éxito. Por ejemplo, el código `200` significa "OK".
- Los códigos de respuesta `3xx` indican redirecciones. Por ejemplo, el código `301` significa "Movido Permanentemente".

Los códigos de estado que probablemente veas con más frecuencia son los de las clases `4xx` y `5xx`, que indican errores del cliente y del servidor, respectivamente.

- Los códigos de respuesta `4xx` indican errores del cliente. Esto significa que la solicitud que hizo el cliente no pudo ser procesada por alguna razón. Por ejemplo, el código `400` significa "Solicitud incorrecta", y el código `404` significa "No encontrado".
- Los códigos de respuesta `5xx` indican errores del servidor. Esto significa que aunque la solicitud del cliente era válida, el servidor no pudo completarla. Por ejemplo, el código `500` significa "Error interno del servidor".

![Untitled](assets/imgs/Untitled%2012.png)

Manejar correctamente estos errores en tu aplicación de Node.js te permitirá brindar respuestas más informativas y útiles a tus usuarios o clientes.