const express = require('express');
const router = express.Router();
const {
	profile_index,
	profile_create,
	profile_update,
	profile_details,
} = require('../../controllers/profileController');

router.get('/', profile_index);
router.post('/', profile_create);
router.put('/', profile_update);
router.get('/:id', profile_details);

module.exports = router;
