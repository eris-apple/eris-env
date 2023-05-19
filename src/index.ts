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
    else if (typeof logger === 'undefined' || !logger) this.logger = new ErisLogger({ terminal: { use: true, options: {} }, options: {} });
    else this.logger = false;
  }

  private logging(title: string, message: string, method: 'error' | 'debug'): void {
    if (this.logger instanceof ErisLogger) this.logger[method]({ title, message });
  }

  getEnv<T extends EnvUtilType>(type?: T, ...names: string[]): EnvUtilTypes[T] {
    const name = names.join('_');
    const value = process.env[name];

    if (!value) {
      this.logging('Environment variable not declared', `The ${name} environment variable is not declared`, 'error');
      throw new Error(`The ${name} environment variable is not declared`);
    }

    switch (type) {
      case 'boolean':
        this.logging('Environment initialized', `The ${name} environment variable has been initialized`, 'debug');
        return Boolean(value) as EnvUtilTypes[T];
      case 'number':
        this.logging('Environment initialized', `The ${name} environment variable has been initialized`, 'debug');
        return Number(value) as EnvUtilTypes[T];
      default:
        this.logging('Environment initialized', `The ${name} environment variable has been initialized`, 'debug');
        return value as EnvUtilTypes[T];
    }
  }
}
