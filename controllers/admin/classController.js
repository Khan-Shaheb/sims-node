const Class = require('../../models/admin/classModel');
const Section = require('../../models/admin/sectionModel');

module.exports = {
	class_index: async (req, res) => {
		try {
			let sections = await Section.find().lean().sort({ name: 'asc' });
			let classes = await Class.find()
				.populate('section')
				.sort({ name: 'asc' })
				.lean();
			if (sections.length == 0) {
				return res.render('admin/class', {
					sections: [
						{ name: 'Please first add section!', _id: null },
					],
					classes,
				});
			}
			if (classes.length == 0) {
				return res.render('admin/class', {
					error: 'No class added! Please add class',
					sections,
				});
			}

			res.render('admin/class', { sections, classes });
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	class_details: async (req, res) => {
		const id = req.params.id;
		try {
			const newClass = await Class.findById(id)
				.populate('section')
				.lean();
			if (newClass == null) {
				req.flash('errorMessage', 'No class found for Edit!');
				return res.redirect('admin/class');
			}
			res.status(200).json(newClass);
		} catch (err) {
			console.log(err);
			res.render('error/500');
		}
	},
	class_update: async (req, res) => {
		const { _id, name, section } = req.body;
		try {
			const updatedClass = await Class.findById(_id);
			if (updatedClass == null) {
				req.flash('errorMessage', 'No Class found for Edit!');
				return res.redirect('/class');
			}
			if (name) {
				updatedClass.name = name;
			}
			if (section) {
				updatedClass.section = section;
			}

			await updatedClass.save();
			req.flash('successMessage', `Successfully edited Class`);
			res.status(302).redirect('/class');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	class_delete: async (req, res) => {
		const id = req.params.id;
		try {
			const deletedClass = await Class.findByIdAndDelete(id);
			if (deletedClass == null) {
				req.flash('errorMessage', 'No class found for Delete!');
				return res.json({ url: '/class', deletedClass: null });
			}
			req.flash('errorMessage', `Successfully deleted class`);
			res.status(200).json({ url: '/class', deletedClass: deletedClass });
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	class_create: async (req, res) => {
		let newClass = new Class(req.body);

		try {
			await newClass.save();
			req.flash('successMessage', `Successfully added class`);
			res.redirect('/class');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
};
