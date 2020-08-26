const Admin = require('../models/admin/adminModel');
module.exports = {
	profile_index: async (req, res) => {
		try {
			let admin = await Admin.findOne().lean();
			res.render('admin/profile', { profile: admin });
		} catch (err) {
			console.log(err);
		}
	},
	profile_details: async (req, res) => {
		const id = req.params.id;
		try {
			const admin = await Admin.findById(id).lean();
			if (admin == null) {
				req.flash('errorMessage', 'No admin found for Edit!');
				return res.redirect('admin/admin');
			}
			res.status(200).json(admin);
		} catch (err) {
			console.log(err);
			res.render('error/500');
		}
	},

	profile_create: async (req, res) => {
		try {
			let admin = new Admin({
				firstName: 'Shajal',
				lastName: 'Kumer',
				gender: 'Male',
				address: 'Rajshahi, Bangladesh',
				phone: '01747562381',
				email: 'shajalkumer@gmail.com',
				image: 'upload/me.jpg',
			});

			admin = await admin.save();
			res.render('admin/profile');
		} catch (err) {
			console.log(err);
		}
	},
	profile_update: async (req, res) => {
		let {
			_id,
			firstName,
			lastName,
			address,
			gender,
			email,
			phone,
		} = req.body;

		try {
			const profile = await Admin.findById(_id);
			if (profile == null) {
				req.flash('errorMessage', 'No profile found for Edit!');
				return res.redirect('/profile');
			}
			profile.firstName = firstName;
			profile.lastName = lastName;
			profile.address = address;
			profile.gender = gender;
			profile.email = email;
			profile.phone = phone;
			await profile.save();
			req.flash('successMessage', `Successfully edited profile`);
			res.status(302).redirect('/profile');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
};
