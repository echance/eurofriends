import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    isAdmin: Boolean,
    participants: [Schema.Types.ObjectId]
})

const Participant = mongoose.model('user', UserSchema, 'user');
export default Participant;