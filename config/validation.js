const { body, validationResult, matchedData } = require('express-validator');

const teacherValidationRules = () => {
	return [
		body('fullName').trim().notEmpty().withMessage('Name is Required!').escape(),

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

		body('address').trim().notEmpty().withMessage('Address is Required!').escape(),
		body('designation').trim().escape(),
		body('dob').trim().escape(),
		body('joinDate').trim().escape(),
		body('religion').trim().escape(),
		body('gender').trim().escape(),
		body('dept').trim().escape(),
		body('photo').trim().escape(),
	];
};

const teacherValidate = (req, res, next) => {
	const errors = validationResult(req);
	const matchedValue = matchedData(req);

	// console.dir(matchedValue);
	// console.dir(errors);

	if (errors.isEmpty()) {
		req.session.success = true;
		req.session.matchedValue = matchedValue;
		return next();
	}

	req.session.errors = errors.mapped();
	req.session.matchedValue = matchedValue;
	req.session.success = false;
	// if js disable then we need it
	res.redirect(req.originalUrl);
	return;
};

const studentValidationRules = () => {
	return [
		body('SFirstName').trim().notEmpty().withMessage('First Name is Required!').escape(),
		body('SLastName').trim().notEmpty().withMessage('Last Name is Required!').escape(),
		body('PFirstName').trim().notEmpty().withMessage('Parent First Name is Required!').escape(),
		body('PLastName').trim().notEmpty().withMessage('Parent Last Name is Required!').escape(),
		body('PMobile')
			.trim()
			.notEmpty()
			.withMessage('Mobile Number is Required!')
			.isInt()
			.toInt()
			.withMessage('Please enter a valid mobile number')
			.escape(),

		body('_class').trim().notEmpty().withMessage('Class is Required!').escape(),
		body('section').trim().notEmpty().withMessage('Section is Required!').escape(),
		body('session').trim().notEmpty().withMessage('Session is Required!').escape(),
		body('regNo').trim().notEmpty().withMessage('Registration No is Required!').escape(),
		body('rollNo')
			.trim()
			.notEmpty()
			.withMessage('Roll No is Required!')
			.isInt()
			.toInt()
			.withMessage('Please enter a valid Roll number')
			.escape(),
		body('SDob').trim(),
		body('religion').trim().escape(),
		body('gender').trim().escape(),
		body('SMobile').trim().escape(),
		body('SEmail').trim().escape(),
		body('blood').trim().escape(),
		body('photo').trim().escape(),
		body('SAddress').trim().escape(),
		body('remarks').trim().escape(),
		body('admissionNo').trim().escape(),
		body('group').trim().escape(),
		body('PEmail').trim().escape(),
		body('PAddress').trim().escape(),
		body('occupation').trim().escape(),
	];
};

const studentValidate = (req, res, next) => {
	const errors = validationResult(req);
	const matchedValue = matchedData(req);

	// console.dir(matchedValue);
	// console.dir(errors);

	if (errors.isEmpty()) {
		req.session.success = true;
		req.session.matchedValue = matchedValue;
		return next();
	}

	req.session.errors = errors.mapped();
	req.session.matchedValue = matchedValue;
	req.session.success = false;
	// if js disable then we need it
	res.redirect(req.originalUrl);
	return;
};

module.exports = {
	teacher: { teacherValidationRules, teacherValidate },
	student: { studentValidationRules, studentValidate },
};
