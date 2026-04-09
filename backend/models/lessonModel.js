const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course',
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
        },
        videoUrl: {
            type: String,
        },
        order: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
