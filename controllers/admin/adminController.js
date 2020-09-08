const Admin = require('../../models/admin/adminModel');
const fs = require('fs');

module.exports = {
	admin_index: async (req, res) => {
		try {
			let admins = await Admin.find().sort({ first_name: 'asc' }).lean();
			res.render('admin/admin', { admins });
			req.session.errors = null;
			req.session.success = null;
			req.session.matchedValue = null;
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

	admin_delete: async (req, res) => {
		const id = req.params.id;
		try {
			const admin = await Admin.findByIdAndDelete(id);
			// console.log(admin);
			// if not found admin
			if (admin == null) {
				req.flash('errorMessage', 'No admin found for delete!');
				res.status(404).json({ url: '/admin', deletedAdmin: null });
				return;
			}
			// delete photo
			if (admin.photo != null) fs.unlink('public/' + admin.photo, (err) => console.log(err));
			// set flash message
			req.flash('successMessage', 'Successfully deleted admin!');
			res.json({
				url: '/admin',
				deletedAdmin: admin,
			});
		} catch (error) {
			console.log(`${error}`);
			res.status(500).render('error/500');
		}
	},

	admin_create: async (req, res) => {
		const fileName = req.file != null ? req.file.filename : null;
		req.body.photo = fileName;
		let admin = new Admin(req.body);
		// console.log(admin);
		try {
			await admin.save();
			req.flash('successMessage', `Successfully added Admin`);
			res.redirect('/admin');
		} catch (err) {
			console.log(err);
			res.render('error/500');
		}
	},

	admin_update: async (req, res) => {
		const id = req.body._id;

		try {
			// find a teacher by teacher ID
			let updateAdmin = await Admin.findById(id);

			// console.dir(updateAdmin);

			// if can not find then redirect
			if (updateAdmin == null) {
				req.flash('errorMessage', 'No admin found for edit!');
				return res.redirect('/admin');
			}

			// if  select new image then delete old image from disk
			if (req.file && updateAdmin.photo != null) {
				fs.unlink('public/' + updateAdmin.photo, (err) => console.log(err));
			}

			// get the image file name
			const fileName = req.file != null ? req.file.filename : null;

			// set image name to body.photo
			req.body.photo = fileName;

			// convert obj to two dimensional array
			const bodyArray = Object.entries(req.body);

			// update admin property
			bodyArray.forEach((item) => {
				updateAdmin[item[0]] = item[1];
			});

			// save to database
			await updateAdmin.save();

			// flash message and redirect
			req.flash('successMessage', `Successfully updated Admin`);
			res.redirect('/admin');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
};
