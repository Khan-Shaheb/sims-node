const express = require('express');
const router = express.Router();
const {
	subject_create,
	subject_delete,
	subject_details,
	subject_index,
	subject_update,
} = require('../../controllers/admin/subjectController');

router.get('/', subject_index);
router.get('/:id', subject_details);
router.post('/', subject_create);
router.delete('/:id', subject_delete);
router.put('/', subject_update);

module.exports = router;
