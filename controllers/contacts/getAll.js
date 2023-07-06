const { listContacts } = require('../../models/contacts');

const getAll = async (req, res) => {
	const result = await listContacts();
	res.json(result);
};

module.exports = getAll;
