const Student = require('../../models/admin/studentModel');
const Class = require('../../models/admin/classModel');
const Section = require('../../models/admin/sectionModel');
const Session = require('../../models/admin/sessionModel');
const Group = require('../../models/admin/deptModel');
module.exports = {
	student_index: async (req, res) => {
		res.render('admin/student/student');
	},
	student_create_get: async (req, res) => {
		try {
			const classes = await Class.find().lean().sort({ name: 'asc' });
			const sections = await Section.find().lean().sort({ name: 'asc' });
			const sessions = await Session.find().lean().sort({ name: 'asc' });
			const groups = await Group.find().lean().sort({ name: 'asc' });
			res.render('admin/student/addStudent', {
				classes,
				sections,
				sessions,
				groups,
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
		try {
			console.log(req.body);
		} catch (err) {
			console.log(err);
			res.render('error/500');
		}
	},
};
