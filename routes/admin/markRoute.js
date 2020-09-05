const express = require('express');
const router = express.Router();

const { mark_index, mark_update, mark_by_class_section_subject } = require('../../controllers/admin/markController');

router.get('/', mark_index);
router.get('/:class/:section/:subject', mark_by_class_section_subject);
router.put('/', mark_update);

module.exports = router;
