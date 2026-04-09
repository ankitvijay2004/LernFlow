const express = require('express');
const router = express.Router();
const {
    getCourses,
    getCourseById,
    createCourse,
    addLessonToCourse,
} = require('../controllers/courseController');
const { protect, instructor } = require('../middleware/authMiddleware');

router.route('/').get(getCourses).post(protect, instructor, createCourse);
router.route('/:id').get(getCourseById);
router.route('/:id/lessons').post(protect, instructor, addLessonToCourse);

module.exports = router;
