const Course = require('../models/courseModel');
const Lesson = require('../models/lessonModel');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
    const courses = await Course.find({}).populate('instructor', 'name');
    res.json(courses);
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.id)
        .populate('instructor', 'name')
        .populate('lessons');

    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Instructor
const createCourse = async (req, res) => {
    const { title, description, thumbnail, price, category } = req.body;

    const course = new Course({
        title,
        description,
        thumbnail,
        price,
        category,
        instructor: req.user._id,
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
};

// @desc    Add lesson to course
// @route   POST /api/courses/:id/lessons
// @access  Private/Instructor
const addLessonToCourse = async (req, res) => {
    const { title, content, videoUrl, order } = req.body;

    const course = await Course.findById(req.params.id);

    if (course) {
        const lesson = new Lesson({
            title,
            content,
            videoUrl,
            order,
            course: req.params.id,
        });

        const createdLesson = await lesson.save();

        course.lessons.push(createdLesson._id);
        await course.save();

        res.status(201).json(createdLesson);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    addLessonToCourse,
};
