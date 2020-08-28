const express = require('express');
const router = express.Router();
const { teacher } = require('../../config/validation');

const {
	teacher_index,
	teacher_create_get,
	teacher_create,
	teacher_delete,
	teacher_details,
} = require('../../controllers/admin/teacherController');

router.get('/', teacher_index);
router.get('/create', teacher_create_get);
router.post(
	'/create',
	teacher.teacherValidationRules(),
	teacher.teacherValidate,
	teacher_create
);
router.delete('/:id', teacher_delete);
router.get('/:id', teacher_details);

module.exports = router;
