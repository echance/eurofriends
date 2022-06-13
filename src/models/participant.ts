import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
    year: Number,
    participants: [
        {
            country: String,
            artist: String,
            song: String,
            youtube: String,
            lyrics: String,
            final_score: Number
        }
    ]
})

const Participant = mongoose.model('participants_by_year', ParticipantSchema, 'participants_by_year');
export default Participant;