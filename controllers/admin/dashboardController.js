const Student = require('../../models/admin/studentModel');
const Teacher = require('../../models/admin/teacherModel');
const Attendance = require('../../models/admin/attendanceModel');
const Subject = require('../../models/admin/subjectModel');
const moment = require('moment');
module.exports = {
	dashboard_index: async (req, res) => {
		const date = moment().format('MM/DD/YYYY');
		try {
			const numberOfStudent = await Student.find().countDocuments();
			const numberOfTeacher = await Teacher.find().countDocuments();
			const todaysAttendance = await Attendance.find({ date }).countDocuments();
			const numberOfSubject = await Subject.find().countDocuments();

			res.render('admin/dashboard', { numberOfStudent, numberOfTeacher, todaysAttendance, numberOfSubject });
		} catch (error) {}
	},
};
