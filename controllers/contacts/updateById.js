const { requestError } = require('../../helpers');
const { updateContact } = require('../../models/contacts');

const updateById = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await updateContact(contactId, req.body);
	if (!result) {
		throw requestError(404, 'Not Found');
	}
	res.json(result);
};

module.exports = updateById;
