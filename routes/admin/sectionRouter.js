const express = require('express');
const router = express.Router();
const { section } = require('../../config/validation');
const {
	section_update,
	section_create,
	section_delete,
	section_details,
	section_index_list,
	section_index,
} = require('../../controllers/admin/sectionController');

router.get('/', section_index);
router.get('/get-all-section-list', section_index_list);
router.get('/:id', section_details);
router.post('/', section.sectionValidationRules(), section.sectionValidate, section_create);
router.delete('/:id', section_delete);
router.put('/', section.sectionValidationRules(), section.sectionValidate, section_update);

module.exports = router;
