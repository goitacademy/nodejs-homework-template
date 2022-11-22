const services = require('../services');
const { requestError } = require('../helpers/apiHelpers');

const getContacts = async (_, res) => {
	const contacts = await services.getContacts();
	
	res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
	const { id } = req.params;

	const contact = await services.getContactById(id);
	
	if (!contact) {
		throw requestError(404, `Not found contact with id: ${id}`);
	};

	return res.status(200).json(contact);
};

const postContact = async (req, res) => {
	const { body } = req;

	const postedContact = await services.addContact(body);

	res.status(201).json(postedContact);
};

const putContact = async (req, res) => {
	const { id } = req.params;
	const { body } = req;

	const contact = await services.updateContactById(id, body);

	if (!contact) {
		throw requestError(404, `Not found contact with id: ${id}`);
	};

	return res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
	const { id } = req.params;

	const deletedContact = await services.removeContactById(id);

	if (!deletedContact) {
		throw requestError(404, `Not found contact with id: ${id}`);
	};
	
	return res.status(200).json({ "message": `contact with id: ${id} was deleted` });
};

const patchContactStatus = async (req, res) => {
	const { id } = req.params;
	const { body } = req;

	const contact = await services.updateStatusContactById(id, body);

	if (!contact) {
		throw requestError(404, `Not found contact with id: ${id}`);
	};

	return res.status(200).json(contact);
};

module.exports = {
	getContacts,
	getContactById,
	postContact,
	deleteContact,
	putContact,
	patchContactStatus,
};