import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
    country: String,
    artist: String,
    song: String,
    youtube: String,
    lyrics: String
})

const Participant = mongoose.model('participant', ParticipantSchema, 'participant');
export default Participant;