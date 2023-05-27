const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
	const result = await contacts.listContacts();
	res.json(result);
};

const getContactById = async (req, res) => {
	const { contactId } = req.params;
	const result = await contacts.getContactById(contactId);

	if (!result) {
		throw HttpError(404, "Not Found");
	}

	res.json(result);
};

const addContact = async (req, res) => {
	const result = await contacts.addContact(req.body);
	res.status(201).json(result);
};

const changeContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await contacts.changeContact(contactId, req.body);

	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const removeContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await contacts.removeContact(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}

	// Якщо операцію успішна, то можна повернути об'єкт:
	res.json(result);

	// або повідомлення:
	// res.json({ message: "Delete success" });

	// Іноді під час видалення треба відправити 204-й статус:
	// res.status(204).json(result);
	// З ним є нюанс: статус приходить як 204й, а тіло відповіді - не приходить зовсім. Бо 204й статус означає "no content". Тому тіло відповіді немає сенсу писати, його все одно не відправлять.
	// Коли статус не 204, то треба передати і статус і тіло.
};

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	changeContact: ctrlWrapper(changeContact),
	removeContact: ctrlWrapper(removeContact),
};
