const express = require('express');
const router = express.Router();
const {
	student_index,
	student_create_get,
	student_create,
} = require('../../controllers/admin/studentController');

router.get('/', student_index);
router.get('/create', student_create_get);
router.post('/', student_create);

module.exports = router;
