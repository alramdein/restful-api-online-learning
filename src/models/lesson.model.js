import mongoose from 'mongoose';

const LessonSchema = mongoose.Schema({
    title: String,
    lecturer: String,
    type: String,
    description: String
}, {
    timestamps: true
});

export default mongoose.model('Lesson', LessonSchema);