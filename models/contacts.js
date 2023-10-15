import { Contact, User } from '../db.js';

export const listContacts = async (userId) => {
	try {
		return await Contact.find({ owner: userId });
	} catch (err) {
		console.error(err);
	}
};

export const getContactById = async (contactId, userId) => {
	try {
		return await Contact.findOne({ _id: contactId, owner: userId });
	} catch (err) {
		console.error(err);
	}
};

export const removeContact = async (contactId, userId) => {
	try {
		const deletedContact = await Contact.findOneAndDelete({
			_id: contactId,
			owner: userId,
		});
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

export const updateContact = async (contactId, body, userId) => {
	try {
		const updatedContact = await Contact.findOneAndUpdate(
			{ _id: contactId, owner: userId },
			body,
			{ new: true }
		);
		return updatedContact;
	} catch (error) {
		console.error('Error updating contact:', error);
	}
};
