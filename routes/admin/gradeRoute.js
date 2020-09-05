const express = require('express');
const router = express.Router();

const {
	grade_create,
	grade_delete,
	grade_details,
	grade_index,
	grade_update,
	grade_index_list,
} = require('../../controllers/admin/gradeController');

router.get('/', grade_index);
router.get('/get-all-grade-list', grade_index_list);
router.get('/:id', grade_details);
router.post('/', grade_create);
router.delete('/:id', grade_delete);
router.put('/', grade_update);

module.exports = router;
