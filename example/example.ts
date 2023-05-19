import { ErisEnvLoader } from '../src';

const envLoader = new ErisEnvLoader({ logger: false });

const prefix = {
  database: 'DATABASE',
};

const config = {
  database: {
    dialect: envLoader.getEnv('string', 'DATABASE', 'DIALECT'),
    host: envLoader.getEnv('string', 'DATABASE', 'HOST'),
    port: envLoader.getEnv('number', 'DATABASE', 'PORT'),
  },
};
