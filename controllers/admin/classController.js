const Class = require('../../models/admin/classModel');
const Section = require('../../models/admin/sectionModel');

module.exports = {
	class_index: async (req, res) => {
		try {
			let sections = await Section.find().lean().sort({ section_name: 'asc' });
			let classes = await Class.find().populate('sections').sort({ class_name: 'asc' }).lean();
			if (sections.length == 0) {
				return res.render('admin/class', {
					sections: [{ name: 'Please first add section!', _id: null }],
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
			req.session.errors = null;
			req.session.success = null;
			req.session.matchedValue = null;
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	class_index_list: async (req, res) => {
		try {
			const classes = await Class.find().lean().sort({ class_name: 'asc' });

			if (classes.length == 0) {
				return res.status(404).json(classes);
			}
			res.status(200).json(classes);
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	class_details: async (req, res) => {
		const id = req.params.id;
		try {
			const newClass = await Class.findById(id).populate('sections').lean();
			if (newClass == null) {
				req.flash('errorMessage', 'No class found for Edit!');
				return res.redirect('admin/class');
			}
			console.log(newClass);
			res.status(200).json(newClass);
		} catch (err) {
			console.log(err);
			res.render('error/500');
		}
	},
	class_update: async (req, res) => {
		const { _id, class_name, sections } = req.body;
		try {
			const updatedClass = await Class.findById(_id);
			if (updatedClass == null) {
				req.flash('errorMessage', 'No Class found for Edit!');
				return res.redirect('/class');
			}
			if (class_name) {
				updatedClass.class_name = class_name;
			}
			if (sections) {
				updatedClass.sections = sections;
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
