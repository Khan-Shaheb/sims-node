const express = require('express');
const router = express.Router();
const { dashboard_index, dashboard_logout } = require('../../controllers/admin/dashboardController');

router.get('/', dashboard_index);
router.post('/dashboard/logout', dashboard_logout);

module.exports = router;
