const Student = require('../../models/admin/studentModel');
const Class = require('../../models/admin/classModel');
const Section = require('../../models/admin/sectionModel');
const Session = require('../../models/admin/sessionModel');
const Group = require('../../models/admin/deptModel');

const fs = require('fs');

module.exports = {
	student_index: async (req, res) => {
		try {
			const students = await Student.find()
				.populate('_class')
				.populate('section')
				.populate('semester')
				.populate('department')
				.sort({ SFirstName: 'asc' })
				.lean();

			res.render('admin/student/student', { students });
			req.session.errors = null;
			req.session.success = null;
			req.session.matchedValue = null;
		} catch (error) {
			console.log(error);
			res.status(500).render('error/500');
		}
	},
	student_create_get: async (req, res) => {
		try {
			const classes = await Class.find().lean().sort({ name: 'asc' });
			const sections = await Section.find().lean().sort({ name: 'asc' });
			const sessions = await Session.find().lean().sort({ name: 'asc' });
			const groups = await Group.find().lean().sort({ name: 'asc' });
			const students = await Student.find().lean().sort({ name: 'asc' });

			res.render('admin/student/addStudent', {
				classes,
				sections,
				sessions,
				groups,
				students,
			});
		} catch (err) {
			console.log(err);
			res.render('error/500');
		}
	},
	student_details: async (req, res) => {
		const id = req.params.id;
		try {
			const student = await Student.findById(id)
				.populate('group')
				.populate('_class')
				.populate('session')
				.populate('section')
				.lean();
			// console.log(student);
			if (student === null) {
				req.flash('errorMessage', 'No Student found for details show!');
				res.redirect('admin/student');
				return;
			}
			return res.json(student);
		} catch (error) {
			console.log(`${error}`);
			res.status(404).render('error/404');
		}
	},
	student_update: async (req, res) => {
		const id = req.body._id;

		try {
			// find a teacher by teacher ID
			let updateStudent = await Student.findById(id);

			// console.dir(updateStudent);

			// if can not find then redirect
			if (updateStudent == null) {
				req.flash('errorMessage', 'No student found for edit!');
				return res.redirect('/student');
			}

			// if don't select image delete before image
			// if (!req.file) {
			// 	fs.unlink('public/' + updatestudent.photo, (err) =>
			// 		console.log(err)
			// 	);
			// }

			// get the image file name
			const fileName = req.file != null ? req.file.filename : null;

			// set image name to body.photo
			req.body.photo = fileName;

			// convert obj to two dimensional array
			const bodyArray = Object.entries(req.body);

			// update student property
			bodyArray.forEach((item) => {
				updateStudent[item[0]] = item[1];
			});

			// save to database
			await updateStudent.save();

			// flash message and redirect
			req.flash('successMessage', `Successfully updated Student`);
			res.redirect('/student');
		} catch (e) {
			if (req.body.photo != null) {
				fs.unlink('public/' + req.body.photo, (err) => console.log(err));
			}
			console.log(e);
			res.status(500).render('error/500');
		}
	},
	student_delete: async (req, res) => {
		const id = req.params.id;

		try {
			const student = await Student.findByIdAndDelete(id);
			// console.log(student);
			// if not found student
			if (student == null) {
				req.flash('errorMessage', 'No student found for delete!');
				res.status(404).json({ url: '/student', deletedStudent: null });
				return;
			}
			// delete photo
			fs.unlink('public/' + student.photo, (err) => console.log(err));
			// set flash message
			req.flash('successMessage', 'Successfully deleted student!');
			res.json({
				url: '/student',
				deletedStudent: student,
			});
		} catch (error) {
			console.log(`${error}`);
			res.status(500).render('error/500');
		}
	},
	student_create: async (req, res) => {
		const fileName = req.file != null ? req.file.filename : null;
		req.body.photo = fileName;

		const student = new Student(req.body);
		// console.log(student);

		try {
			await student.save();
			req.flash('successMessage', `Successfully added Student`);
			res.redirect('/student');
		} catch (e) {
			if (req.body.photo != null) {
				fs.unlink(req.body.photo, (err) => console.log(err));
			}
			console.log(e);
			res.status(500).render('error/500');
		}
	},
};
