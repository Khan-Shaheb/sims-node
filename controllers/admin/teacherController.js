const Teacher = require('../../models/admin/teacherModel');
const Department = require('../../models/admin/deptModel');
const fs = require('fs');

module.exports = {
	teacher_index: async (req, res) => {
		try {
			const teachers = await Teacher.find().populate('dept').sort({ full_name: 'asc' }).lean();

			res.render('admin/teacher/teacher', { teachers });
			req.session.errors = null;
			req.session.success = null;
			req.session.matchedValue = null;

			// console.log(JSON.stringify(teachers, null, 4));
		} catch (error) {
			console.log(error);
			res.status(500).render('error/500');
		}
	},
	teacher_create_get: async (req, res) => {
		const dept = await Department.find().sort({ name: 'asc' }).lean();
		res.render('admin/teacher/teacherAdd', { dept });
	},
	teacher_details: async (req, res) => {
		const id = req.params.id;
		try {
			const teacher = await Teacher.findById(id).populate('dept').lean();
			if (teacher === null) {
				req.flash('errorMessage', 'No teacher found for details show!');
				res.redirect('admin/teacher');
				return;
			}
			return res.json(teacher);
		} catch (error) {
			console.log(`${error}`);
			res.status(404).render('error/404');
		}
	},
	teacher_update: async (req, res) => {
		const id = req.body._id;
		try {
			// find a teacher by teacher ID
			let updateTeacher = await Teacher.findById(id);

			// if can not find then redirect
			if (updateTeacher == null) {
				req.flash('errorMessage', 'No teacher found for edit!');
				return res.redirect('/teacher');
			}

			// if don't select image delete before image
			// if (!req.file) {
			// 	fs.unlink('public/' + updateTeacher.photo, (err) =>
			// 		console.log(err)
			// 	);
			// }

			// get the image file name
			const fileName = req.file != null ? req.file.filename : null;

			// set image name to body.photo
			req.body.photo = fileName;

			// convert obj to two dimensional array
			const bodyArray = Object.entries(req.body);

			// update teacher property
			bodyArray.forEach((item) => {
				updateTeacher[item[0]] = item[1];
			});

			// console.log(updateTeacher);

			// save to database
			await updateTeacher.save();

			// flash message and redirect
			req.flash('successMessage', `Successfully updated Teacher`);
			res.redirect('/teacher');
		} catch (e) {
			if (req.body.photo != null) {
				fs.unlink('public/' + req.body.photo, (err) => console.log(err));
			}
			console.log(e);
			res.status(500).render('error/500');
		}
	},
	teacher_delete: async (req, res) => {
		const id = req.params.id;

		try {
			const teacher = await Teacher.findByIdAndDelete(id);

			if (teacher == null) {
				req.flash('errorMessage', 'No teacher found for delete!');
				res.status(404).json({ url: '/teacher', deletedTeacher: null });
				return;
			}
			fs.unlink('public/' + teacher.photo, (err) => console.log(err));
			req.flash('successMessage', 'Successfully deleted teacher!');
			res.json({
				url: '/teacher',
				deletedTeacher: teacher,
			});
		} catch (error) {
			console.log(`${error}`);
			res.status(500).render('error/500');
		}
	},
	teacher_create: async (req, res) => {
		const fileName = req.file != null ? req.file.filename : null;

		req.body.photo = fileName;
		const teacher = new Teacher(req.body);
		// console.log(teacher)

		try {
			await teacher.save();
			req.flash('successMessage', `Successfully added Teacher`);
			res.redirect('/teacher');
		} catch (e) {
			if (req.body.photo != null) {
				fs.unlink('uploads/' + req.body.photo, (err) => console.log(err));
			}
			console.log(e);
			res.status(500).render('error/500');
		}
	},
};
