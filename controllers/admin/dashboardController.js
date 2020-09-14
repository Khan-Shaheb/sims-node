const Student = require('../../models/admin/studentModel');
const Teacher = require('../../models/admin/teacherModel');
const Attendance = require('../../models/admin/attendanceModel');
const Subject = require('../../models/admin/subjectModel');
const moment = require('moment');
module.exports = {
	dashboard_index: async (req, res) => {
		if (req.session.login != true) {
			return res.redirect('/login');
		}

		const date = moment().format('MM/DD/YYYY');
		try {
			const numberOfStudent = await Student.find().countDocuments();
			const numberOfTeacher = await Teacher.find().countDocuments();
			const todaysAttendance = await Attendance.find({ date }).countDocuments();
			const numberOfSubject = await Subject.find().countDocuments();

			res.render('admin/dashboard', { numberOfStudent, numberOfTeacher, todaysAttendance, numberOfSubject });
		} catch (error) {}
	},
	dashboard_logout: async (req, res) => {
		console.log('Hekllo');
		req.session.login = false;
		return res.redirect('/login');
	},
};
