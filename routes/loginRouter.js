const express = require('express');
const router = express.Router();
const Admin = require('../models/admin/adminModel');

router.get('/', (req, res) => {
	req.session.login = false;
	res.render('login', { layout: 'login' });
});
router.post('/', async (req, res) => {
	try {
		const admin = await Admin.findOne({ email: req.body.email, password: req.body.password }).lean();
		if (admin) {
			req.flash('successMessage', `Successfully Login as Admin`);
			req.session.login = true;
			return res.redirect('/');
		}
		req.session.login = false;
		return res.redirect('/login');
		// console.log(admin);
	} catch (error) {
		console.log(error);
		res.render('error/500');
	}
});

module.exports = router;
