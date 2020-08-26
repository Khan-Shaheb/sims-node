const express = require('express');
const router = express.Router();
const {
	section_create,
	section_delete,
	section_details,
	section_index,
	section_update,
} = require('../../controllers/admin/classController');

router.get('/', section_index);
router.get('/:id', section_details);
router.post('/', section_create);
router.delete('/:id', section_delete);
router.put('/', section_update);

module.exports = router;
