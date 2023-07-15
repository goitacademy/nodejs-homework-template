const { requestError } = require('../../helpers');
const { Contact } = require('../../models');

const removeById = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndDelete(contactId);
	if (!result) {
		throw requestError(404, 'Not Found');
	}
	res.json({ message: 'contact deleted' });
};

module.exports = removeById;
