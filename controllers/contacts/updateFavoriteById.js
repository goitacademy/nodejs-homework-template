const { requestError } = require('../../helpers');
const Contact = require('../../models/contact');

const updateFavoriteById = async (req, res, next) => {
	console.log(req.body);
	if (Object.keys(req.body).length === 0) {
		throw requestError(400, 'Missing fields');
	}
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
	if (!result) {
		throw requestError(404);
	}
	res.json(result);
};

module.exports = updateFavoriteById;
