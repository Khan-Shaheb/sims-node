const express = require('express');
const router = express.Router();
const { teacher } = require('../../config/validation');
const multer = require('multer');
const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
// SET STORAGE
const  storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, 'uploads/' + file.fieldname + '-' + Date.now())
  }
})
const upload = multer({
	storage: storage,
	fileFilter: (req, file, callback) =>
		callback(null, imageMimeTypes.includes(file.mimetype)),
});
const {
	teacher_index,
	teacher_create_get,
	teacher_create,
	teacher_delete,
	teacher_details,
	teacher_update,
} = require('../../controllers/admin/teacherController');

router.get('/', teacher_index);
router.get('/create', teacher_create_get);
router.post(
    '/create',
    upload.single('photo'),
	teacher.teacherValidationRules(),
	teacher.teacherValidate,
	teacher_create
);
router.delete('/:id', teacher_delete);
router.get('/:id', teacher_details);
router.put(
	'/',
	upload.single('photo'),
	teacher.teacherValidationRules(),
	teacher.teacherValidate,
	teacher_update
);

module.exports = router;
