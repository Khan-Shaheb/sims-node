const express = require('express');
const router = express.Router();

const {
	attendance_create,
	attendance_index,
	attendance_get_all,
} = require('../../controllers/admin/attendanceController');

router.get('/', attendance_index);
router.get('/:_class/:section/:subject/:m/:d/:y', attendance_get_all);
router.post('/create', attendance_create);

module.exports = router;
