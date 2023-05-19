import { ErisLogger } from 'eris-logger';
import { EnvUtilType, EnvUtilTypes } from './types';
export declare class EnvLoader {
    logger: ErisLogger;
    constructor(logger?: ErisLogger);
    getEnv<T extends EnvUtilType>(prefix: string, name: string, type: T): EnvUtilTypes[T];
}
