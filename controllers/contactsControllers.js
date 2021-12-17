const Contacts = require("../model/index");

const getContactsList = async (req, res, next) => {
	try {
		const contacts = await Contacts.listContacts();
		res.json({ status: "success", code: 200, data: { contacts } });
	} catch (error) {
		next(error);
	}
};

const getContactById = async (req, res, next) => {
	try {
		const contact = await Contacts.getContactById(req.params.contactId);

		if (contact) {
			return res
				.status(200)
				.json({ status: "success", code: 200, data: { contact } });
		}

		return res
			.status(404)
			.json({ status: "error", code: 404, message: "Not found" });
	} catch (error) {
		next(error);
	}
};

const addContact = async (req, res, next) => {
	try {
		const contact = await Contacts.addContact(req.body);
		res.status(201).json({ status: "success", code: 201, data: { contact } });
	} catch (error) {
		next(error);
	}
};

const deleteContactById = async (req, res, next) => {
	try {
		const contact = await Contacts.removeContact(req.params.contactId);

		if (contact) {
			return res
				.status(200)
				.json({ status: "success", code: 200, data: { contact } });
		}

		return res
			.status(404)
			.json({ status: "error", code: 404, message: "Not found" });
	} catch (error) {
		next(error);
	}
};

const updateContactById = async (req, res, next) => {
	try {
		const contact = await Contacts.updateContact(
			req.params.contactId,
			req.body
		);

		if (contact) {
			return res
				.status(200)
				.json({ status: "success", code: 200, data: { contact } });
		}

		return res
			.status(404)
			.json({ status: "error", code: 404, message: "Not found" });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getContactsList,
	getContactById,
	addContact,
	deleteContactById,
	updateContactById,
};
