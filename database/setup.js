const pgp = require('pg-promise')();

const cn = {
	host: 'localhost',
	port: 5432,
	database: 'parks_project',
	user:'anton'
};

const db = pgp(cn);

module.exports = db;
