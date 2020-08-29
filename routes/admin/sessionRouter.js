const express = require('express');
const router = express.Router();
const {
	session_update,
	session_create,
	session_delete,
	session_details,
	session_index,
} = require('../../controllers/admin/sessionController');

router.get('/', session_index);
router.get('/:id', session_details);
router.post('/', session_create);
router.delete('/:id', session_delete);
router.put('/', session_update);

module.exports = router;
