const Enrollment = require('../models/enrollmentModel');
const Course = require('../models/courseModel');

// @desc    Enroll a user in a course
// @route   POST /api/enrollments
// @access  Private
const enrollInCourse = async (req, res) => {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }

    const alreadyEnrolled = await Enrollment.findOne({
        user: req.user._id,
        course: courseId,
    });

    if (alreadyEnrolled) {
        res.status(400).json({ message: 'User already enrolled in this course' });
        return;
    }

    const enrollment = await Enrollment.create({
        user: req.user._id,
        course: courseId,
    });

    res.status(201).json(enrollment);
};

// @desc    Get logged in user's enrollments
// @route   GET /api/enrollments/my
// @access  Private
const getMyEnrollments = async (req, res) => {
    const enrollments = await Enrollment.find({ user: req.user._id })
        .populate({
            path: 'course',
            populate: { path: 'instructor', select: 'name' }
        });
    res.json(enrollments);
};

// @desc    Check enrollment status
// @route   GET /api/enrollments/check/:courseId
// @access  Private
const checkEnrollment = async (req, res) => {
    const enrollment = await Enrollment.findOne({
        user: req.user._id,
        course: req.params.courseId
    });
    res.json({ isEnrolled: !!enrollment });
};

module.exports = {
    enrollInCourse,
    getMyEnrollments,
    checkEnrollment,
};
