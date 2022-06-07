import express from 'express';
import Participant from '../models/participant';

const participantRouter = express.Router();

participantRouter.get('/', async (request, response) => {
    try {
        const allParticipants = await Participant.find({});
        response.status(200).send(allParticipants);
    } catch (error) {
        response.status(400).send({
            error: true,
            message: 'Error while retrieving Eurovision participants'
        })
    }
});


export default participantRouter;