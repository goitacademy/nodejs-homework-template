const Contact = require("./contactSchema.js");

async function listContacts() {
	try {
		const contacts = await Contact.find();
		return contacts;
	} catch (error) {
		console.error("Błąd podczas pobierania kontaktów:", error.message);
		throw error;
	}
}

async function getContactById(id) {
	try {
		const contact = await Contact.findById(id);
		if (!contact) {
			return null;
		}
		return contact;
	} catch (error) {
		console.error("Błąd podczas pobierania kontaktu:", error.message);
	}
}

async function removeContact(id) {
	try {
		const deleted = await Contact.findByIdAndDelete(id);
		if (!deleted) {
			return null;
		}
		return `Usunięto kontakt: ${deleted}`;
	} catch (error) {
		console.error("Błąd podczas usuwania kontaktu:", error.message);
	}
}

async function addContact(newContactData) {
	try {
		const newContact = await Contact.create(newContactData);
		return `Dodano nowy kontakt: ${newContact}`;
	} catch (error) {
		console.error("Błąd podczas tworzenia kontaktu:", error.message);
	}
}

async function updateContact(id, updateFields) {
	try {
		const contactExists = await Contact.findById(id);
		if (!contactExists) {
			return null;
		}
		const updatedContact = await Contact.findByIdAndUpdate(
			id,
			updateFields,
			{ new: true, runValidators: true }
		);
		return `Zaktualizowano kontakt: ${updatedContact}`;
	} catch (error) {
		console.error("Błąd podczas aktualizacji kontaktu:", error.message);
	}
}

async function updateStatusContact(id, favorite) {
	try {
		const contactExists = await Contact.findById(id);
		if (!contactExists) {
			return null;
		}

		const updatedContact = await Contact.findByIdAndUpdate(
			id,
			{ favorite },
			{ new: true, runValidators: true }
		);

		return `Zaktualizowano status kontaktu: ${updatedContact}`;
	} catch (error) {
		console.error(
			"Błąd podczas aktualizacji statusu kontaktu:",
			error.message
		);
	}
}

module.exports = {
	addContact,
	listContacts,
	getContactById,
	updateContact,
	removeContact,
	updateStatusContact,
};
