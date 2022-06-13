"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const participant_1 = __importDefault(require("../models/participant"));
const logger = require('../logger')(module);
const participantRouter = express_1.default.Router();
var YearQuery;
(function (YearQuery) {
    YearQuery[YearQuery["None"] = 0] = "None";
    YearQuery[YearQuery["Single"] = 1] = "Single";
    YearQuery[YearQuery["Range"] = 2] = "Range";
    YearQuery[YearQuery["Invalid"] = 3] = "Invalid";
})(YearQuery || (YearQuery = {}));
participantRouter.get('/:year?', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = request.params.year;
        let allParticipants;
        const queryType = validateYear(year);
        switch (queryType) {
            case YearQuery.None:
                logger.info('Returning all participants');
                allParticipants = yield participant_1.default.find({});
                break;
            case YearQuery.Single:
                logger.info(`Returning participants from year: ${year}`);
                allParticipants = yield participant_1.default.find({ 'year': year });
                break;
            case YearQuery.Range:
                logger.info(`Returning all participants from years: ${year}`);
                const yearRange = year ? year.split('-') : null;
                if (yearRange) {
                    const rangeStart = parseInt(yearRange[0]);
                    const rangeFinish = parseInt(yearRange[1]);
                    const yearsInRange = range(rangeStart, rangeFinish, 1);
                    allParticipants = yield participant_1.default.find({ 'year': { $in: yearsInRange } });
                }
                break;
            case YearQuery.Invalid:
                logger.error(`Error in request with parameter year = ${year}`);
                response.status(400).send({
                    error: true,
                    message: 'Invalid request'
                });
                break;
        }
        response.status(200).send(allParticipants);
    }
    catch (error) {
        logger.error('Error while retrieving participants', error);
        response.status(400).send({
            error: true,
            message: 'Error while retrieving Eurovision participants'
        });
    }
}));
const validateYear = (year) => {
    if (!year) {
        return YearQuery.None;
    }
    if (year.includes('-') && !isNaN(Number(year.split('-')[0])) && !isNaN(Number(year.split('-')[1]))) {
        return YearQuery.Range;
    }
    if (!isNaN(Number(year))) {
        return YearQuery.Single;
    }
    return YearQuery.Invalid;
};
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
exports.default = participantRouter;
