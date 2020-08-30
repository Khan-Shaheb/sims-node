const Student = require('../../models/admin/studentModel');
const Class = require('../../models/admin/classModel');
const Section = require('../../models/admin/sectionModel');
const Session = require('../../models/admin/sessionModel');
const Group = require('../../models/admin/deptModel');
const Parent = require('../../models/admin/parentModel');
module.exports = {
	student_index: async (req, res) => {
		try {
			const students = await Student.find()
				.sort({ SFirstName: 'asc' })
				.lean();
			const parents = await Parent.find().lean();
			res.render('admin/student/student', { students, parents });
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
	student_details: async (req, res) => {},
	student_update: async (req, res) => {},
	student_delete: async (req, res) => {},
	student_create: async (req, res) => {
		const fileName = req.file != null ? req.file.filename : null;
		req.body.photo = fileName;

		const student = new Student({
			SFirstName: req.body.SFirstName,
			SLastName: req.body.SLastName,
			gender: req.body.gender,
			dob: req.body.dob,
			religion: req.body.religion,
			SAddress: req.body.SAddress,
			SMobile: req.body.SMobile,
			SEmail: req.body.SEmail,
			blood: req.body.blood,
			photo: req.body.photo,
			remarks: req.body.remarks,
			class: req.body.class,
			section: req.body.section,
			session: req.body.session,
			regNo: req.body.regNo,
			rollNo: req.body.rollNo,
			group: req.body.group,
			admissionNo: req.body.admissionNo,
		});
		// console.log(student)
		const parent = new Parent({
			PFirstName: req.body.PFirstName,
			PLastName: req.body.PLastName,
			PMobile: req.body.PMobile,
			occupation: req.body.occupation,
			PMobile: req.body.PMobile,
			PEmail: req.body.PEmail,
			PAddress: req.body.PAddress,
		});

		try {
			await student.save();
			await parent.save();
			req.flash('successMessage', `Successfully added Student`);
			res.redirect('/student');
		} catch (e) {
			if (req.body.photo != null) {
				fs.unlink('uploads/' + req.body.photo, (err) =>
					console.log(err)
				);
			}
			console.log(e);
			res.status(500).render('error/500');
		}
	},
};
