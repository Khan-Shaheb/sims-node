const Attendance = require('../../models/admin/attendanceModel');
const Class = require('../../models/admin/classModel');
const Subject = require('../../models/admin/subjectModel');
const Section = require('../../models/admin/sectionModel');
const moment = require('moment');

module.exports = {
	attendance_index: async (req, res) => {
		try {
			const classes = await Class.find().sort({ class_name: 'desc' }).lean();
			const subjects = await Subject.find().sort({ subject_name: 'desc' }).lean();
			const sections = await Section.find().sort({ section_name: 'asc' }).lean();

			res.status(200).render('admin/attendance', {
				classes,
				subjects,
				sections,
			});
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	attendance_get_all: async (req, res) => {
		const { _class, section, subject, m, d, y } = req.params;
		const date = `${m}/${d}/${y}`;
		// console.log(req.params);
		try {
			const att = await Attendance.findOne({ _class, section, subject, date }).lean();
			if (!att) return res.json({ attendance: null });
			res.json({ ...att.attendance });
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},

	attendance_create: async (req, res) => {
		let { _class, section, subject, date } = req.body;

		try {
			let attendance = await Attendance.findOne({ _class, section, subject, date });

			if (attendance) {
				attendance.attendance = req.body.attendance;

				await attendance.save();
				req.flash('successMessage', `Successfully Updated attendance`);
				// res.redirect('/attendance');
				res.json({ attendance: attendance, message: 'Successfully Updated attendance' });
				return;
			}
		} catch (error) {
			console.log(error);
		}

		attendance = new Attendance(req.body);
		try {
			attendance = await attendance.save();
			// req.flash('successMessage', `Successfully Updated attendance`);
			// res.redirect('/attendance');
			res.json({ attendance: attendance, message: 'Successfully Updated attendance' });
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
};
