import { ErisLogger } from 'eris-logger';
import { expand } from 'dotenv-expand';
import { config } from 'dotenv';

import { EnvUtilType, EnvUtilTypes } from './types';

const dotenvFile = config();
expand(dotenvFile);

export class ErisEnvLoader {
  logger: ErisLogger | false;

  constructor({ logger }: { logger?: ErisLogger | boolean }) {
    if (logger instanceof ErisLogger) this.logger = logger;
    else if (typeof logger === 'undefined')
      this.logger = new ErisLogger({
        terminal: { use: true, options: {} },
        options: {},
      });
    else this.logger = false;
  }

  private logging(message: string, method: 'error' | 'debug'): void {
    if (this.logger instanceof ErisLogger) this.logger[method]({title: "ENV LOADER", message, error: method === 'error' ? new Error(message) : {}}, );
  }

  getEnv<T extends EnvUtilType>(type?: T, ...names: string[]): EnvUtilTypes[T] {
    const name = names.join('_');
    const value = process.env[name];

    if (!value) {
      this.logging(`The ${name} environment variable is not declared`, 'error');
      throw new Error(`The ${name} environment variable is not declared`);
    }

    switch (type) {
      case 'boolean':
        this.logging(`The ${name} environment variable has been initialized`, 'debug');
        return (value === 'true') as EnvUtilTypes[T];
      case 'number':
        this.logging(`The ${name} environment variable has been initialized`, 'debug');
        return Number(value) as EnvUtilTypes[T];
      default:
        this.logging(`The ${name} environment variable has been initialized`, 'debug');
        return value as EnvUtilTypes[T];
    }
  }
}
