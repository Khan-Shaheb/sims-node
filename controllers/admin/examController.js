const Exam = require('../../models/admin/examModel');

module.exports = {
	exam_index: async (req, res) => {
		try {
			const exams = await Exam.find().lean();

			if (exams.length == 0) {
				return res.render('admin/exam', {
					error: 'No exam added! Please add exam',
					exams,
				});
			}
			res.status(200).render('admin/exam', { exams });
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	exam_details: async (req, res) => {
		const id = req.params.id;
		try {
			const exam = await Exam.findById(id).lean();
			if (exam == null) {
				req.flash('errorMessage', 'No exam found for show!');
				return res.redirect('admin/exam');
			}
			res.status(200).json(exam);
		} catch (err) {
			console.log(err);
			res.render('error/500');
		}
	},
	exam_delete: async (req, res) => {
		const id = req.params.id;
		try {
			const exam = await Exam.findByIdAndDelete(id);
			if (exam == null) {
				req.flash('errorMessage', 'No exam found for Delete!');
				return res.json({
					url: '/exam',
					deletedExam: null,
				});
			}
			req.flash('errorMessage', `Successfully deleted exam`);
			res.status(200).json({
				url: '/exam',
				deletedExam: exam,
			});
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	exam_update: async (req, res) => {
		let id = req.body._id;
		try {
			const exam = await Exam.findById(id);
			if (exam == null) {
				req.flash('errorMessage', 'No exam found for Edit!');
				return res.redirect('/exam');
			}
			// convert obj to two dimensional array
			const bodyArray = Object.entries(req.body);

			// update exam property
			bodyArray.forEach((item) => {
				exam[item[0]] = item[1];
			});

			await exam.save();
			req.flash('successMessage', `Successfully edited exam`);
			res.status(302).redirect('/exam');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	exam_create: async (req, res) => {
		console.log(req.body);
		let exam = new Exam(req.body);

		try {
			exam = await exam.save();
			req.flash('successMessage', `Successfully added exam`);
			res.redirect('/exam');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
};
