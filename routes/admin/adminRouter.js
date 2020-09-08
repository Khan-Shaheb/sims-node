const express = require('express');
const router = express.Router();
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
	admin_index,
	admin_create,
	admin_update,
	admin_details,
	admin_delete,
} = require('../../controllers/admin/adminController');

router.get('/', admin_index);
router.post('/create', upload.single('photo'), admin_create);
router.put('/', upload.single('photo'), admin_update);
router.get('/:id', admin_details);
router.delete('/:id', admin_delete);

module.exports = router;
