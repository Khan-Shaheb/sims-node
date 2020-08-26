const Teacher = require('../../models/admin/teacherModel');
module.exports = {
	teacher_index: async (req, res) => {
		res.render('admin/teacher/teacher');
	},
	teacher_create_get: async (req, res) => {
		res.render('admin/teacher/teacherAdd');
	},
	teacher_details: async (req, res) => {},
	teacher_update: async (req, res) => {},
	teacher_delete: async (req, res) => {},
	teacher_create: async (req, res) => {},
};
