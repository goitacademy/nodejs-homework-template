
const Contacts = require('../models/contactsModel');
const { HttpError } = require('../utils');
const { Types } = require('mongoose');



exports.listContactsinDataBase = () => Contacts.find();

exports.getContactByIdinDataBase = (contactId) => Contacts.findById(contactId);

exports.removeContact = async (contactId) => {
	const removeContact = await Contacts.findByIdAndDelete(contactId);
	return removeContact;

}


exports.addContact = async (dataContact) => {
	const newContact = await Contacts.create(dataContact);
	return newContact;
}


exports.updateContact = async (contactId, updateContact) => {
	const updatedUser = await Contacts.findById(contactId);

	Object.keys(updateContact).forEach(key => {
		updatedUser[key] = updateContact[key];
	})

	return updatedUser.save();

}


exports.updateContactFavorite = async (contactId, favorite) => {

	const updateFavorite = await Contacts.findByIdAndUpdate(contactId, { favorite }, { new: true });

	return updateFavorite;
}


exports.userFavorite = async (filter) => {
	const favorite = await Contacts.exists(filter);
	if (!favorite) throw new HttpError(404, 'User not found');
}


exports.checkContactExist = async (status) => {
	const userExists = await Contacts.exists(status);

	if (userExists) throw new HttpError(409, 'User Exists');
}


exports.checkUserbyId = async (id) => {
	const idIsValid = Types.ObjectId.isValid(id);

	if (!idIsValid) throw new HttpError(404, 'User not found..');

	const userExists = await Contacts.exists({ _id: id });

	if (!userExists) throw new HttpError(404, 'User not found..');
}