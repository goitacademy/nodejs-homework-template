const { requestError } = require('../../helpers');
const { Contact } = require('../../models');

const getOneById = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await Contact.findById(contactId);
	if (!result) {
		throw requestError(404, 'Not Found');
	}
	res.json(result);
};

module.exports = getOneById;
