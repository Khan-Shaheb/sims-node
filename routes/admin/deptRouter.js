const express = require('express');
const router = express.Router();

const {
	department_create,
	department_delete,
	department_details,
	department_index,
	department_update,
	department_index_list,
} = require('../../controllers/admin/deptController');

router.get('/', department_index);
router.get('/get-all-dept-list', department_index_list);
router.get('/:id', department_details);
router.post('/', department_create);
router.delete('/:id', department_delete);
router.put('/', department_update);

module.exports = router;
