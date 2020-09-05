const Admin = require('../../models/admin/adminModel');
module.exports = {
	admin_index: async (req, res) => {
		try {
			let admin = await Admin.findOne().lean();
			res.render('admin/admin', { admin: admin });
		} catch (err) {
			console.log(err);
		}
	},
	admin_details: async (req, res) => {
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

	admin_create: async (req, res) => {
		try {
			console.log(req.body);
			// admin = await admin.save();
			res.render('admin/admin');
		} catch (err) {
			console.log(err);
		}
	},
	admin_update: async (req, res) => {
		let { _id, firstName, lastName, address, gender, email, phone } = req.body;

		try {
			const admin = await Admin.findById(_id);
			if (admin == null) {
				req.flash('errorMessage', 'No admin found for Edit!');
				return res.redirect('/admin');
			}
			admin.firstName = firstName;
			admin.lastName = lastName;
			admin.address = address;
			admin.gender = gender;
			admin.email = email;
			admin.phone = phone;
			await admin.save();
			req.flash('successMessage', `Successfully edited admin`);
			res.status(302).redirect('/admin');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
};
