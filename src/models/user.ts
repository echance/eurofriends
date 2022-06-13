import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    isAdmin: Boolean,
    participants: {
        year: Number,
        roster: [String]
    }
})

const Participant = mongoose.model('user', UserSchema, 'user');
export default Participant;