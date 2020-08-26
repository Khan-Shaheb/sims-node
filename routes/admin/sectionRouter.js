const express = require('express');
const router = express.Router();
const {
	section_update,
	section_create,
	section_delete,
	section_details,
	section_details_for_class,
	section_index,
} = require('../../controllers/admin/sectionController');

router.get('/', section_index);
router.get('/get-section-for-class', section_details_for_class);
router.get('/:id', section_details);
router.post('/', section_create);
router.delete('/:id', section_delete);
router.put('/', section_update);

module.exports = router;
