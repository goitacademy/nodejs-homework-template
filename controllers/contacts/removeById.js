const { requestError } = require('../../helpers');
const { removeContact } = require('../../models/contacts');

const removeById = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await removeContact(contactId);
	if (!result) {
		throw requestError(404, 'Not Found');
	}
	res.json({ message: 'contact deleted' });
};

module.exports = removeById;
