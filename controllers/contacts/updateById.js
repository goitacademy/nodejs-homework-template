const { requestError } = require('../../helpers');
const { Contact } = require('../../models');

const updateById = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
	if (!result) {
		throw requestError(404, 'Not Found');
	}
	res.json(result);
};

module.exports = updateById;
