const router = require('express').Router(),
	user = require('../models/user'),
	passport = require('passport'),
	//auth = require('./security/auth');


	router.get('/', (request, respond) => {
		respond.send('welcome');
	}); 

	module.exports = router;