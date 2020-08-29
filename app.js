const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
const handlebars = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const { globalVariable } = require('./config/config');
const { incrementOne, selected, selected2 } = require('./helpers/hbs');
const methodOverride = require('method-override');

// init express app
const app = express();

// Load Config
dotenv.config({ path: './config/config.env' });

// DB connection
connectDB();

// Load static folder
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// config method override
app.use(methodOverride('_method'));

// session config
app.use(
	session({
		secret: 'any secret',
		saveUninitialized: false,
		resave: false,
	})
);
app.use(function (req, res, next) {
	res.locals.session = req.session;
	next();
});
// flash init
app.use(flash());

// call global variable for flash message
app.use(globalVariable);

// config handlebars
app.set('view engine', 'hbs');
app.engine(
	'hbs',
	handlebars({
		extname: 'hbs',
		defaultLayout: 'main',
		helpers: { incrementOne, selected, selected2 },
	})
);

// ALl Router
const dashboardRouter = require('./routes/admin/dashboardRouter');
const profile = require('./routes/admin/profileRouter');
const classRoom = require('./routes/admin/classRoomRouter');
const classRouter = require('./routes/admin/classRouter');
const subject = require('./routes/admin/subjectRouter');
const teacher = require('./routes/admin/teacherRouter');
const student = require('./routes/admin/studentRouter');
const section = require('./routes/admin/sectionRouter');
const department = require('./routes/admin/deptRouter');
const academicYear = require('./routes/admin/sessionRouter');

app.use('/', dashboardRouter);
app.use('/profile', profile);
app.use('/classroom', classRoom);
app.use('/class', classRouter);
app.use('/subject', subject);
app.use('/teacher', teacher);
app.use('/student', student);
app.use('/section', section);
app.use('/department', department);
app.use('/session', academicYear);

const port = process.env.PORT || 3000;
// Listen Port
app.listen(port, () => console.log(`App listening to port ${port}`));
