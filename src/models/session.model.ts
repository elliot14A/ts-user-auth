import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends mongoose.Document {
    user: UserDocument['_id'],
    valid: Boolean,
    userAgent: String,
    createdAt: Date,
    updatedAt: Date
}

const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    valid: { type: Boolean, required: true},
    userAgent: { type: String }
});

export const sessionModel = mongoose.model('Session', sessionSchema);