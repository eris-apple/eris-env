"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErisEnvLoader = void 0;
var eris_logger_1 = require("eris-logger");
var dotenv_expand_1 = require("dotenv-expand");
var dotenv_1 = require("dotenv");
var dotenvFile = (0, dotenv_1.config)();
(0, dotenv_expand_1.expand)(dotenvFile);
var ErisEnvLoader = /** @class */ (function () {
    function ErisEnvLoader(_a) {
        var logger = _a.logger;
        if (logger instanceof eris_logger_1.ErisLogger)
            this.logger = logger;
        else if (typeof logger === 'undefined')
            this.logger = new eris_logger_1.ErisLogger({
                terminal: { use: true, options: {} },
                options: {},
            });
        else
            this.logger = false;
    }
    ErisEnvLoader.prototype.logging = function (message, method) {
        if (this.logger instanceof eris_logger_1.ErisLogger)
            this.logger[method]({ title: "ENV LOADER", message: message, error: method === 'error' ? new Error(message) : {} });
    };
    ErisEnvLoader.prototype.getEnv = function (type) {
        var names = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            names[_i - 1] = arguments[_i];
        }
        var name = names.join('_');
        var value = process.env[name];
        if (!value) {
            this.logging("The ".concat(name, " environment variable is not declared"), 'error');
            throw new Error("The ".concat(name, " environment variable is not declared"));
        }
        switch (type) {
            case 'boolean':
                this.logging("The ".concat(name, " environment variable has been initialized"), 'debug');
                return (value === 'true');
            case 'number':
                this.logging("The ".concat(name, " environment variable has been initialized"), 'debug');
                return Number(value);
            default:
                this.logging("The ".concat(name, " environment variable has been initialized"), 'debug');
                return value;
        }
    };
    ErisEnvLoader.prototype.getEnvWithFallback = function (type, fallback) {
        var names = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            names[_i - 2] = arguments[_i];
        }
        var name = names.join('_');
        var value = process.env[name];
        if (!value) {
            this.logging("The ".concat(name, " environment variable is not declared, used fallback"), 'warning');
            value = fallback;
        }
        switch (type) {
            case 'boolean':
                this.logging("The ".concat(name, " environment variable has been initialized"), 'debug');
                return (value === 'true');
            case 'number':
                this.logging("The ".concat(name, " environment variable has been initialized"), 'debug');
                return Number(value);
            default:
                this.logging("The ".concat(name, " environment variable has been initialized"), 'debug');
                return value;
        }
    };
    return ErisEnvLoader;
}());
exports.ErisEnvLoader = ErisEnvLoader;
