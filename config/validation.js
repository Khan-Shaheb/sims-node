const { body, validationResult, matchedData } = require('express-validator');
const teacherValidationRules = () => {
	return [
		body('fullName')
			.trim()
			.notEmpty()
			.withMessage('Name is Required!')
			.escape(),
		body('email')
			.trim()
			.notEmpty()
			.withMessage('Email is Required!')
			.isEmail()
			.withMessage('Email is not valid')
			.normalizeEmail(),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('Password is Required!')
			.isLength({ min: 4 })
			.withMessage('Must be at least 4 chars'),
		body('phone')
			.trim()
			.notEmpty()
			.withMessage('Phone Number is Required!')
			.isInt()
			.toInt()
			.withMessage('Please enter a valid phone number')
			.escape(),
		body('address')
			.trim()
			.notEmpty()
			.withMessage('Address is Required!')
			.escape(),
	];
};

const teacherValidate = (req, res, next) => {
	const errors = validationResult(req);
	const matchedValue = matchedData(req);

	if (errors.isEmpty()) {
		req.session.success = true;
		req.session.matchedValue = matchedValue;
		return next();
	}

	req.session.errors = errors.mapped();
	req.session.matchedValue = matchedValue;
	req.session.success = false;
	res.redirect('/teacher/create');
	return;
};

module.exports = { teacher: { teacherValidationRules, teacherValidate } };
