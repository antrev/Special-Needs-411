const router = require('express').Router(),
	user = require('../models/user');


	//home page on load
	router.get('/', (request, respond) => {
		respond.render('welcome');
	}); 

	//login button
	router.post('/', (request, respond) =>{
		respond.send('user');
	})

	//signup
	router.get('/newuser', (request, respond) =>{
	respond.render('newuser');
})

	//register
	router.get('/user', (request, respond) => {
		respond.render('user');
	})

	


	module.exports = router;