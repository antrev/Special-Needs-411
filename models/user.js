const bcrypt = require('bcrypt'),
	db = require('../database/setup');

	function create(user){
		const password = bcrypt.hashSync(user.password, 10);
		return db.oneOrNone(`inseret into users(id, email, password_digest) values($1, $2, $3);`, [user.email, password]);
	};//create

	function findByEmail(email){
		return db.oneOrNone(`select * from users where email=$1'`, [email]);
	}

	module.exports = { create, findByEmail}