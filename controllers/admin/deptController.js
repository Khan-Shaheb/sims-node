const Department = require('../../models/admin/deptModel');

module.exports = {
	department_index: async (req, res) => {
		try {
			const departments = await Department.find().lean();

			if (departments.length == 0) {
				return res.render('admin/department', {
					error: 'No department added! Please add department',
					departments,
				});
			}
			res.status(200).render('admin/department', { departments });
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	department_details: async (req, res) => {
		const id = req.params.id;
		try {
			const department = await Department.findById(id).lean();
			if (department == null) {
				req.flash('errorMessage', 'No department found for Edit!');
				return res.redirect('admin/department');
			}
			res.status(200).json(department);
		} catch (err) {
			console.log(err);
			res.render('error/500');
		}
	},
	department_delete: async (req, res) => {
		const id = req.params.id;
		try {
			const department = await Department.findByIdAndDelete(id);
			if (department == null) {
				req.flash('errorMessage', 'No department found for Delete!');
				return res.json({
					url: '/department',
					deletedDepartment: null,
				});
			}
			req.flash('errorMessage', `Successfully deleted department`);
			res.status(200).json({
				url: '/department',
				deletedDepartment: department,
			});
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	department_update: async (req, res) => {
		let { _id, dept_name } = req.body;
		dept_name = dept_name.trim();
		try {
			const department = await Department.findById(_id);
			if (department == null) {
				req.flash('errorMessage', 'No department found for Edit!');
				return res.redirect('/department');
			}
			if (dept_name) department.dept_name = dept_name;
			await department.save();
			req.flash('successMessage', `Successfully edited department`);
			res.status(302).redirect('/department');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	department_create: async (req, res) => {
		let department = new Department(req.body);

		try {
			department = await department.save();
			req.flash('successMessage', `Successfully added department`);
			res.redirect('/department');
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
	department_index_list: async (req, res) => {
		try {
			const departments = await Department.find()
				.lean()
				.sort({ dept_name: 'asc' });
			console.log(departments);

			if (departments.length == 0) {
				return res.status(404).json(departments);
			}
			res.status(200).json(departments);
		} catch (err) {
			console.log(err);
			res.status(500).render('error/500');
		}
	},
};
