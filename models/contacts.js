import { Contact } from '../db.js';

export const listContacts = async () => await Contact.find({});

export const getContactById = async (contactId) => {
	try {
		return await Contact.findOne({ _id: contactId });
	} catch (err) {
		return undefined;
	}
};

export const removeContact = async (contactId) => {
	try {
		const deletedContact = await Contact.findOneAndDelete({ _id: contactId });
	} catch (error) {
		console.error('Error deleting contact:', error);
	}
};

export const addContact = async (body) => {
	try {
		const newContact = new Contact(body);
		const savedContact = await newContact.save();
		return savedContact;
	} catch (error) {
		console.error('Error saving contact:', error);
	}
};

export const updateContact = async (contactId, body) => {
	try {
		const updatedContact = await Contact.findOneAndUpdate(
			{ _id: contactId },
			body,
			{ new: true }
		);
		return updatedContact;
	} catch (error) {
		console.error('Error updating contact:', error);
	}
};
