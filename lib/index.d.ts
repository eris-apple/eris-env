import { ErisLogger } from 'eris-logger';
import { EnvUtilType, EnvUtilTypes } from './types';
export declare class ErisEnvLoader {
    logger: ErisLogger | false;
    constructor({ logger }: {
        logger?: ErisLogger | boolean;
    });
    private logging;
    getEnv<T extends EnvUtilType>(type?: T, ...names: string[]): EnvUtilTypes[T];
    getEnvWithFallback<T extends EnvUtilType>(type: T, fallback: T, ...names: string[]): EnvUtilTypes[T];
}
