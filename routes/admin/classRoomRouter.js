const express = require('express');
const router = express.Router();
const ClassRoom = require('../../models/admin/classRoomModel');

router.get('/', async (req, res) => {
	try {
		const classRooms = await ClassRoom.find().lean();
		if (classRooms.length == 0) {
			return res.render('admin/subject', {
				error: 'No Classroom added! Please first add classroom',
			});
		}
		res.status(200).render('admin/classroom', { classRooms });
	} catch (err) {
		console.log(err);
		res.status(500).render('error/500');
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const classRoom = await ClassRoom.findById(id).lean();

		if (classRoom == null) {
			req.flash('errorMessage', 'No Classroom found for Edit!');
			return res.redirect('admin/classroom');
		}
		res.status(200).json(classRoom);
	} catch (err) {
		console.log(err);
		res.render('error/500');
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const classRoom = await ClassRoom.findByIdAndDelete(id);
		if (classRoom == null) {
			req.flash('errorMessage', 'No classRoom found for Delete!');
			return res.json({ url: '/classroom', deletedClassRoom: null });
		}
		req.flash('errorMessage', `Successfully deleted Classroom`);
		res.status(200).json({ url: '/classroom', deletedClassRoom: subject });
	} catch (err) {
		console.log(err);
		res.status(500).render('error/500');
	}
});

router.put('/', async (req, res) => {
	const { _id, name, studentCount } = req.body;
	console.log(req.body);
	try {
		const classRoom = await ClassRoom.findById(_id);
		if (classRoom == null) {
			req.flash('errorMessage', 'No classRoom found for Edit!');
			return res.redirect('/classroom');
		}
		classRoom.name = name;
		classRoom.studentCount = studentCount;
		await classRoom.save();
		req.flash('successMessage', `Successfully edited classRoom`);
		res.status(302).redirect('/classroom');
	} catch (err) {
		console.log(err);
		res.status(500).render('error/500');
	}
});

router.post('/', async (req, res) => {
	let classRoom = new ClassRoom(req.body);

	try {
		await classRoom.save();
		req.flash(
			'successMessage',
			`Successfully added Classroom and Total Student`
		);
		res.redirect('/classroom');
	} catch (err) {
		console.log(err);
		res.status(500).render('error/500');
	}
});

module.exports = router;
