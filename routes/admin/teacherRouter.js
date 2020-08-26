const express = require('express');
const router = express.Router();
const {
	teacher_index,
	teacher_create_get,
} = require('../../controllers/admin/teacherController');

router.get('/', teacher_index);
router.get('/create', teacher_create_get);

module.exports = router;
