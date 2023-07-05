const { requestError } = require('../../helpers');
const { getContactById } = require('../../models/contacts');

const getOneById = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await getContactById(contactId);
	if (!result) {
		throw requestError(404, 'Not Found');
	}
	res.json(result);
};

module.exports = getOneById;
