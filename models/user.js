const bcrypt = require('bcryptjs'),
	db = require('../database/setup');


	function create(user){
		const password = bcrypt.hashSync(user.password, 10);
	return db.oneOrNone(`INSERT INTO users(email, password_digest) VALUES($1, $2)RETURNING *;`,[user.email, password]);	
	};

	function findByEmail(email){
		return db.oneOrNone(`select * from users where email=$1`, [email]);
	}

	module.exports = { create, findByEmail }