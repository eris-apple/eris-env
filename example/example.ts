import { ErisEnvLoader } from '../src';

const envLoader = new ErisEnvLoader({});

const config = {
  database: {
    dialect: envLoader.getEnv('string', 'DATABASE', 'DIALECT'),
    host: envLoader.getEnv('string', 'DATABASE', 'HOST'),
    port: envLoader.getEnv('number', 'DATABASE', 'PORT'),
  },
};
