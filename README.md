# Eris Env Loader

* [About](#about-package)
* [Installation](#installation)
* [Usage](#example)

## About package

ErisEnvLoader is a simple package that aims to simplify the initialization
of environment variables from .env files in Node.js projects.

##  Installation

```shell
npm i eris-env
```

##  Usage

* Create a `.env` file in the root folder of your project and define 
your environment variables in the format `KEY=VALUE`. For example:

```dotenv
DATABASE_DIALECT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

* Create a `config.js` file in the root folder of your project and define package.

```js
// ES6
import { ErisEnvLoader } from 'eris-env';
// CommonJS
const ErisEnvLoader = require('eris-env');

const envLoader = new ErisEnvLoader();
```

* Initialize variable:

```js
const config = {
  database: {
    dialect: envLoader.getEnv('string', 'DATABASE', 'DIALECT'),
    host: envLoader.getEnv('string', 'DATABASE', 'HOST'),
    port: envLoader.getEnv('number', 'DATABASE', 'PORT'),
  },
};
```

