const Subject = require('../../models/admin/subjectModel');
const Class = require('../../models/admin/classModel');

module.exports = {
	subject_index: async (req, res) => {
		try {
			const subjects = await Subject.find().populate('class').lean();
			const classes = await Class.find().lean().sort({ name: 'asc' });
			if (subjects.length == 0) {
				return res.render('admin/subject', {
					error: 'No subject added! Please add subject',
					classes,
				});
			}
			res.status(200).render('admin/subject', { subjects, classes });
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	subject_details: async (req, res) => {
		const id = req.params.id;
		try {
			const subject = await Subject.findById(id).lean();
			if (subject == null) {
				req.flash('errorMessage', 'No Subject found for Edit!');
				return res.redirect('admin/subject');
			}
			res.status(200).json(subject);
		} catch (err) {
			console.log(err);
			res.render('error/500');
		}
	},
	subject_delete: async (req, res) => {
		const id = req.params.id;
		try {
			const subject = await Subject.findByIdAndDelete(id);
			if (subject == null) {
				req.flash('errorMessage', 'No Subject found for Delete!');
				return res.json({ url: '/subject', deletedSubject: null });
			}
			req.flash('errorMessage', `Successfully deleted subject`);
			res.status(200).json({ url: '/subject', deletedSubject: subject });
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	subject_update: async (req, res) => {
		let { _id, name } = req.body;
		name = name.trim();
		try {
			const subject = await Subject.findById(_id);
			if (subject == null) {
				req.flash('errorMessage', 'No Subject found for Edit!');
				return res.redirect('/subject');
			}
			if (name) subject.name = name;
			await subject.save();
			req.flash('successMessage', `Successfully edited subject`);
			res.status(302).redirect('/subject');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	subject_create: async (req, res) => {
		let subject = new Subject(req.body);

		try {
			subject = await subject.save();
			req.flash('successMessage', `Successfully added subject`);
			res.redirect('/subject');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
};
