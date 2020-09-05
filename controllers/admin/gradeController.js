const Grade = require('../../models/admin/gradeModel');

module.exports = {
	grade_index: async (req, res) => {
		try {
			const grades = await Grade.find().lean();

			if (grades.length == 0) {
				return res.render('admin/grade', {
					error: 'No grade added! Please add grade',
					grades,
				});
			}
			res.status(200).render('admin/grade', { grades });
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	grade_index_list: async (req, res) => {
		try {
			const grades = await Grade.find().lean();
			res.json(grades);
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: 'Server Error ' });
		}
	},
	grade_details: async (req, res) => {
		const id = req.params.id;
		try {
			const grade = await Grade.findById(id).lean();
			if (grade == null) {
				req.flash('errorMessage', 'No grade found for show!');
				return res.redirect('admin/grade');
			}
			res.status(200).json(grade);
		} catch (err) {
			console.log(err);
			res.render('error/500');
		}
	},
	grade_delete: async (req, res) => {
		const id = req.params.id;
		try {
			const grade = await Grade.findByIdAndDelete(id);
			if (grade == null) {
				req.flash('errorMessage', 'No grade found for Delete!');
				return res.json({
					url: '/grade',
					deletedGrade: null,
				});
			}
			req.flash('errorMessage', `Successfully deleted grade`);
			res.status(200).json({
				url: '/grade',
				deletedGrade: grade,
			});
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	grade_update: async (req, res) => {
		let id = req.body._id;
		try {
			const grade = await Grade.findById(id);
			if (grade == null) {
				req.flash('errorMessage', 'No grade found for Edit!');
				return res.redirect('/grade');
			}
			// convert obj to two dimensional array
			const bodyArray = Object.entries(req.body);

			// update grade property
			bodyArray.forEach((item) => {
				grade[item[0]] = item[1];
			});

			await grade.save();
			req.flash('successMessage', `Successfully edited grade`);
			res.status(302).redirect('/grade');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	grade_create: async (req, res) => {
		console.log(req.body);
		let grade = new Grade(req.body);

		try {
			grade = await grade.save();
			req.flash('successMessage', `Successfully added grade`);
			res.redirect('/grade');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
};
