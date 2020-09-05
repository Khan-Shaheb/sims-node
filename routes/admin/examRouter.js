const express = require('express');
const router = express.Router();

const {
	exam_create,
	exam_delete,
	exam_details,
	exam_index,
	exam_update,
} = require('../../controllers/admin/examController');

router.get('/', exam_index);
router.get('/:id', exam_details);
router.post('/', exam_create);
router.delete('/:id', exam_delete);
router.put('/', exam_update);

module.exports = router;
