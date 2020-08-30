const Section = require('../../models/admin/sectionModel');
module.exports = {
	section_index: async (req, res) => {
		try {
			const sections = await Section.find().sort({ name: 'asc' }).lean();
			if (sections.length == 0) {
				return res.render('admin/section', {
					error: 'No subject added! Please add subject',
				});
			}
			res.status(200).render('admin/section', { sections });
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	section_details: async (req, res) => {
		const id = req.params.id;
		try {
			const section = await Section.findById(id).lean();
			if (section == null) {
				req.flash('errorMessage', 'No section found for Edit!');
				return res.redirect('admin/section');
			}
			res.status(200).json(section);
		} catch (err) {
			console.log(err);
			res.render('error/500');
		}
	},
	section_update: async (req, res) => {
		const { _id, name } = req.body;
		try {
			const section = await Section.findById(_id);
			if (section == null) {
				req.flash('errorMessage', 'No section found for Edit!');
				return res.redirect('/section');
			}
			section.name = name;
			await section.save();
			req.flash('successMessage', `Successfully edited section`);
			res.status(302).redirect('/section');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	section_delete: async (req, res) => {
		const id = req.params.id;
		try {
			const section = await Section.findByIdAndDelete(id);
			if (section == null) {
				req.flash('errorMessage', 'No section found for Delete!');
				return res
					.status(404)
					.json({ url: '/section', deletedSection: null });
			}
			req.flash('successMessage', 'Successfully deleted Section');
			res.status(200).json({ url: '/section', deletedSection: section });
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	section_create: async (req, res) => {
		let section = new Section({
			name: req.body.name.toUpperCase(),
		});

		try {
			section = await section.save();
			req.flash('successMessage', `Successfully added Section`);
			res.redirect('/section');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	section_index_list: async (req, res) => {
		try {
			const sections = await Section.find().lean().sort({ name: 'asc' });
			if (sections.length == 0) {
				return res.status(404).json(sections);
			}
			res.status(200).json(sections);
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
};
