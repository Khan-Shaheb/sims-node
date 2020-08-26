const express = require('express');
const router = express.Router();
const {
	dashboard_index,
} = require('../../controllers/admin/dashboardController');

router.get('/', dashboard_index);

module.exports = router;
