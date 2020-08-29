const { body, validationResult, matchedData } = require('express-validator');
let url = null;
const teacherValidationRules = (redirectOrNot = false ) => {
    url = redirectOrNot;
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
		body('designation').trim().escape(),
		body('dob'),
		body('joinDate'),
		body('religion').trim().escape(),
		body('gender'),
		body('dept'),
		body('photo'),
	];
};

const teacherValidate = (req, res, next) => {
	const errors = validationResult(req);
	const matchedValue = matchedData(req);

	// console.dir(matchedValue);

	if (errors.isEmpty()) {
		req.session.success = true;
		req.session.matchedValue = matchedValue;
		return next();
	}

	req.session.errors = errors.mapped();
	req.session.matchedValue = matchedValue;
    req.session.success = false;
    
    if(!url) res.redirect('/teacher/create');
    else res.redirect('/teacher');
	return;
};

module.exports = { teacher: { teacherValidationRules, teacherValidate } };
