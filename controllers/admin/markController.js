const Mark = require('../../models/admin/markModel');
const Exam = require('../../models/admin/examModel');
const Class = require('../../models/admin/classModel');
const Section = require('../../models/admin/sectionModel');
const Subject = require('../../models/admin/subjectModel');

module.exports = {
	mark_index: async (req, res) => {
		try {
			// const marks = await Mark.find().lean();
			const classes = await Class.find().lean().sort({ name: 'asc' });
			const exams = await Exam.find().lean();

			res.status(200).render('admin/mark', { classes, exams });
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	mark_by_class_section_subject: async (req, res) => {
		const _class = req.params.class;
		const section = req.params.section;
		const subject = req.params.subject;
		try {
			const marks = await Mark.find({ _class: _class, section: section, subject: subject })
				.sort({ student: 'asc' })
				.lean();
			if (!marks) {
				res.status(404).json(marks);
			}
			res.status(200).json(marks);
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: 'Server Error' });
		}
	},
	mark_update: async (req, res) => {
		console.log(req.body);
		try {
			let mark = await Mark.findOne({
				student: req.body.student,
				_class: req.body._class,
				section: req.body.section,
				subject: req.body.subject,
				exam: req.body.exam,
			});
			// console.log(mark);
			if (mark) {
				mark.mark = req.body.mark;
				mark.grade_point = req.body.grade_point;
				mark.comment = req.body.comment;
				await mark.save();
				req.flash('successMessage', 'Mark Updated Successfully!');
				return res.json({ mark, updated: true, created: false });
			}
			mark = new Mark(req.body);
			await mark.save();
			req.flash('successMessage', `Mark Updated Successfully!`);
			return res.json({ mark, created: true, updated: false });
		} catch (err) {
			console.log(err);
			res.status(500).json({ mark: null, error: 'Server Error' });
		}
	},
};
