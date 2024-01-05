import Contact from "./contactModel.js";

const listContacts = async () => {
	return Contact.find();
};

const getContactById = async (contactId) => {
	return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
	return Contact.findByIdAndDelete(contactId);
};

const addContact = async (body) => {
	return Contact.create(body);
};

const updateContact = async (contactId, body) => {
	return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
	const { favorite } = body;

	if (favorite === undefined) {
		throw new Error("missing field favorite");
	}

	const contact = await Contact.findByIdAndUpdate(
		contactId,
		{ favorite },
		{ new: true }
	);

	if (contact) {
		return contact;
	} else {
		throw new Error("Not found");
	}
};

export {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateStatusContact,
};
