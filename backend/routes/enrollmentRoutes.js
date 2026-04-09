const express = require('express');
const router = express.Router();
const {
    enrollInCourse,
    getMyEnrollments,
    checkEnrollment,
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, enrollInCourse);
router.route('/my').get(protect, getMyEnrollments);
router.route('/check/:courseId').get(protect, checkEnrollment);

module.exports = router;
