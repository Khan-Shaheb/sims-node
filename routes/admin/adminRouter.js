const express = require('express');
const router = express.Router();
const { admin_index, admin_create, admin_update, admin_details } = require('../../controllers/admin/adminController');

router.get('/', admin_index);
router.post('/', admin_create);
router.put('/', admin_update);
router.get('/:id', admin_details);

module.exports = router;
