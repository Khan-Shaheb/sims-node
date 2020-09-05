const express = require('express');
const router = express.Router();
const { student } = require('../../config/validation');
const multer = require('multer');
const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
// SET STORAGE
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/');
	},
	filename: function (req, file, cb) {
		cb(null, 'uploads/' + file.fieldname + '-' + Date.now());
	},
});
const upload = multer({
	storage: storage,
	fileFilter: (req, file, callback) => callback(null, imageMimeTypes.includes(file.mimetype)),
});
const {
	student_index,
	student_create_get,
	student_create,
	student_details,
	student_delete,
	student_update,
	student_list_by_class_section,
} = require('../../controllers/admin/studentController');

router.get('/', student_index);
router.get('/:class/:section', student_list_by_class_section);
router.get('/create', student_create_get);
router.post(
	'/create',
	upload.single('photo'),
	student.studentValidationRules(),
	student.studentValidate,
	student_create
);
router.delete('/:id', student_delete);
router.get('/:id', student_details);
router.put('/', upload.single('photo'), student.studentValidationRules(), student.studentValidate, student_update);

module.exports = router;
