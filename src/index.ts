import { ErisLogger } from 'eris-logger';
import { EnvUtilType, EnvUtilTypes } from './types';

export class EnvLoader {
  logger: ErisLogger;

  constructor(logger?: ErisLogger) {
    this.logger = logger ? logger : new ErisLogger({ terminal: { use: true, options: {} }, options: {} });
  }

  getEnv<T extends EnvUtilType>(prefix: string, name: string, type: T): EnvUtilTypes[T] {
    const value = process.env[`${prefix}_${name}`];

    if (!value) throw new Error('Environment variable' + name ? `${prefix}_${name}` : prefix + 'not declared');

    switch (type) {
      case 'boolean':
        this.logger.debug({ title: 'Env initialized', message: `Env variable ${prefix}_${name} initialized` });
        return Boolean(value) as EnvUtilTypes[T];
      case 'number':
        this.logger.debug({ title: 'Env initialized', message: `Env variable ${prefix}_${name} initialized` });
        return Number(value) as EnvUtilTypes[T];
      default:
        this.logger.debug({ title: 'Env initialized', message: `Env variable ${prefix}_${name} initialized` });
        return value as EnvUtilTypes[T];
    }
  }
}
