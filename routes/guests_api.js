exports.getAll = function (req, res) {
	const guests = require('../data/guests.json');
	res.status(200).json(guests);
}