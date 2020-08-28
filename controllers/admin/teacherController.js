const Teacher = require('../../models/admin/teacherModel');
const Department = require('../../models/admin/deptModel');

module.exports = {
	teacher_index: async (req, res) => {
		try {
			const teachers = await Teacher.find()
				.populate('dept')
				.sort({ fullName: 'desc' })
				.lean();

			res.render('admin/teacher/teacher', { teachers });
			req.session.errors = null;
			req.session.success = null;

			console.log(JSON.stringify(teachers, null, 4));
		} catch (error) {
			console.log(error);
			res.status(500).render('error/500');
		}
	},
	teacher_create_get: async (req, res) => {
		const dept = await Department.find().lean();
		res.render('admin/teacher/teacherAdd', { dept });
	},
	teacher_details: async (req, res) => {
		const id = req.params.id;
		try {
			const teacher = await Teacher.findById(id).populate('dept').lean();
			if (teacher === null) {
				req.flash('errorMessage', 'No teacher found for details show!');
				res.status(404).json({
					url: '/teacher',
					teacherDetails: null,
				});
				return;
			}
			console.log(teacher);
			return res.json({
				url: '/teacher',
				teacherDetails: teacher,
			});
		} catch (error) {
			console.log(`${error}`);
			res.status(404).render('error/404');
		}
	},
	teacher_update: async (req, res) => {},
	teacher_delete: async (req, res) => {
		const id = req.params.id;

		try {
			const teacher = await Teacher.findByIdAndDelete(id);

			if (teacher == null) {
				req.flash('errorMessage', 'No teacher found for delete!');
				res.status(404).json({ url: '/teacher', deletedTeacher: null });
				return;
			}
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
		const teacher = new Teacher(req.body);
		try {
			await teacher.save();
			req.flash('successMessage', `Successfully added Teacher`);
			res.redirect('/teacher');
		} catch (e) {
			console.log(e);
			res.status(500).render('error/500');
		}
	},
};
