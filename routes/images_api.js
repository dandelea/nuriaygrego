exports.getAll = function (req, res) {
	const images = require('../data/images.json');
	let result = {};
	images.forEach(image => {
		if (Object.keys(result).includes(image.section)) {
			result[image.section] = [...result[image.section], image]
		} else {
			result[image.section] = [image]
		}
	});
	res.status(200).json(result);
}