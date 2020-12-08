import mongoose from 'mongoose';

const EventSchema = mongoose.Schema({
    eventName: String,
    date: Date,
    description: String
}, {
    timestamps: true
});

export default mongoose.model('Event', EventSchema);