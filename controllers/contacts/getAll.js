const { Contact } = require('../../models');

const getAll = async (req, res) => {
	const { page, limit, favorite } = req.query;
	const skip = (page - 1) * limit;
	let result;
	if (favorite === 'true') {
		result = await Contact.find({ favorite: true }).skip(skip).limit(limit);
	} else if (favorite === 'false') {
		result = await Contact.find({ favorite: false }).skip(skip).limit(limit);
	} else {
		result = await Contact.find().skip(skip).limit(limit);
	}
	res.json(result);
};

module.exports = getAll;
