exports.getAll = function (req, res) {
	const dedicatories = require('../data/dedicatories.json');
	res.status(200).json(dedicatories);
}