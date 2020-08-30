const express = require('express');
const router = express.Router();

const {
	class_create,
	class_delete,
	class_details,
	class_index,
	class_update,
	class_index_list,
} = require('../../controllers/admin/classController');

router.get('/', class_index);
router.get('/get-all-class-list', class_index_list);
router.get('/:id', class_details);
router.post('/', class_create);
router.delete('/:id', class_delete);
router.put('/', class_update);

module.exports = router;
