const flash = require('express-flash');

module.exports = {
	globalVariable: (req, res, next) => {
		res.locals.successMessage = req.flash('successMessage');
        res.locals.errorMessage = req.flash('errorMessage');
        res.locals.session = req.session;

		next();
	},
};
