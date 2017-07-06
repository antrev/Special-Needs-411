const db = require('../database/setup')

const = () =>{
	return db.one
} 

const update = () => {
	return db.none
}

const destroy = () =>{
	return db.none
}

module.exports = { findAllByUser, findById, create, update, destroy }
