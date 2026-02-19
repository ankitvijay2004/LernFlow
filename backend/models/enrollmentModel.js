const mongoose = require('mongoose');

const enrollmentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course',
        },
        completedLessons: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lesson',
            },
        ],
        status: {
            type: String,
            enum: ['enrolled', 'completed'],
            default: 'enrolled',
        },
    },
    {
        timestamps: true,
    }
);

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
