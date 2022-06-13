"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
const Participant = mongoose_1.default.model('participants_by_year', ParticipantSchema, 'participants_by_year');
exports.default = Participant;
