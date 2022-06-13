import {createLogger, format, transports} from 'winston';
import path from 'path';



const { combine, timestamp, label, printf } = format;

const loggerFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const getLabel = (callingModule: any) => {
    const parts = callingModule.filename.split(path.sep);
    return path.join(parts[parts.length - 2], parts.pop());
}

module.exports = (callingModule: any) => {
    return createLogger({
        format: combine(
            label({label: getLabel(callingModule)}),
            timestamp(),
            loggerFormat
        )
        ,
        transports: [
            new transports.Console(),
            new transports.File({filename: 'eurofriends.log'})
        ]
    });
}