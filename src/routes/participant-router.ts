import express from 'express';
import Participant from '../models/participant';

const logger = require('../logger')(module);

const participantRouter = express.Router();

enum YearQuery {
    None,
    Single,
    Range,
    Invalid
}

participantRouter.get('/:year?', async (request, response) => {
    try {
        const year = request.params.year;
        
        let allParticipants;
        const queryType = validateYear(year);
        switch (queryType) {
            case YearQuery.None:
                logger.info('Returning all participants');
                allParticipants = await Participant.find({});
                break;
            case YearQuery.Single:
                logger.info(`Returning participants from year: ${year}`);
                allParticipants = await Participant.find({'year': year});
                break;
            case YearQuery.Range:
                logger.info(`Returning all participants from years: ${year}`);
                const yearRange = year ? year.split('-') : null;
                if (yearRange) {
                    const yearsInRange = range(parseInt(yearRange[0]), parseInt(yearRange[1]), 1);
                    allParticipants = await Participant.find({'year': {$in: yearsInRange}});
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
    } catch (error) {
        logger.error('Error while retrieving participants', error);
        response.status(400).send({
            error: true,
            message: 'Error while retrieving Eurovision participants'
        })
    }
});

const validateYear = (year: any) => {
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
}

const range = (start: number, stop: number, step: number) => 
    Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))

export default participantRouter;