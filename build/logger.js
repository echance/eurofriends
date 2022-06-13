"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const { combine, timestamp, label, printf } = winston_1.format;
const loggerFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const getLabel = (callingModule) => {
    const parts = callingModule.filename.split(path_1.default.sep);
    return path_1.default.join(parts[parts.length - 2], parts.pop());
};
module.exports = (callingModule) => {
    return (0, winston_1.createLogger)({
        format: combine(label({ label: getLabel(callingModule) }), timestamp(), loggerFormat),
        transports: [
            new winston_1.transports.Console(),
            new winston_1.transports.File({ filename: 'eurofriends.log' })
        ]
    });
};
