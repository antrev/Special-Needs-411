require('dotenv').config();

const express = require('express'),
	app = express(),
	mustacheExpress = require('mustache-express'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	controller = require('./controller/welcome'),
	port = process.env.PORT || 8080;


	app.engine('html', mustacheExpress());
	app.set('view engine', 'html');
	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname + '/public'));

	// passport middleware
	app.use(session({
		secret:'ginger',
		resave: true,
		saveUninitialized: true
	}));

	//passport 
	const auth = require('./security/auth');
	app.use(auth.passportInstance);
	app.use(auth.passportSession);

	app.use(bodyParser.urlencoded({ extended: false}));
	app.use(cookieParser());

	app.use('/', controller);


	app.listen(port, () => console.log('Server listening on port', port));
