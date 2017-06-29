const pgp = require('pg-promise')();

const cn = {
	host: 'localhost',
	port: 5432,
	database: 'schools_projects',
	user:'anton'
};

const db = pgp(cn);

module.exports = db;
