"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvLoader = void 0;
var eris_logger_1 = require("eris-logger");
var EnvLoader = /** @class */ (function () {
    function EnvLoader(logger) {
        this.logger = logger ? logger : new eris_logger_1.ErisLogger({ terminal: { use: true, options: {} }, options: {} });
    }
    EnvLoader.prototype.getEnv = function (prefix, name, type) {
        var value = process.env["".concat(prefix, "_").concat(name)];
        if (!value)
            throw new Error('Environment variable' + name ? "".concat(prefix, "_").concat(name) : prefix + 'not declared');
        switch (type) {
            case 'boolean':
                this.logger.debug({ title: 'Env initialized', message: "Env variable ".concat(prefix, "_").concat(name, " initialized") });
                return Boolean(value);
            case 'number':
                this.logger.debug({ title: 'Env initialized', message: "Env variable ".concat(prefix, "_").concat(name, " initialized") });
                return Number(value);
            default:
                this.logger.debug({ title: 'Env initialized', message: "Env variable ".concat(prefix, "_").concat(name, " initialized") });
                return value;
        }
    };
    return EnvLoader;
}());
exports.EnvLoader = EnvLoader;
