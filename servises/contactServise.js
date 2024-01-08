
const Contacts = require('../models/contactsModel');
const { HttpError } = require('../utils');
const { Types } = require('mongoose');



exports.listContactsinDataBase = async (owner, query) => {
	const findOptions = query.favorite ? { favorite: query.favorite, owner: owner } : { owner: owner };

	const contactsQuery = Contacts.find(findOptions);

	const paginationPage = query.page ? +query.page : 1;
	const paginationLimil = query.limit ? +query.limit : 20;
	const skip = (paginationPage - 1) * paginationLimil;

	contactsQuery.skip(skip).limit(paginationLimil);

	const contacts = await contactsQuery;
	const total = await Contacts.countDocuments(findOptions);

	return {
		contacts,
		total,
	}
}


exports.getContactByIdinDataBase = async (contactId, owner) => {
	const { _id: ownerId } = owner;

	const contact = await Contacts.findOne({ _id: contactId, owner: ownerId });

	if (!contact) {
		throw new HttpError(404, 'User not found');
	}

	return contact;
}


exports.removeContact = async (contactId, owner) => {
	const { _id: ownerId } = owner;

	const contact = await Contacts.findOneAndDelete({ _id: contactId, owner: ownerId });

	if (!contact) {
		throw new HttpError(404, 'User not found');
	}

	return contact;

}


exports.addContact = async (dataContact, owner) => {
	const contact = await Contacts.create({ ...dataContact, owner });
	return contact;
}


exports.updateContact = async (contactId, updateContact, owner) => {
	const { _id: ownerId } = owner;

	const contact = await Contacts.findOneAndUpdate({ _id: contactId, owner: ownerId }, updateContact, { new: true });

	if (!contact) {
		throw new HttpError(404, 'User not found');
	}

	return contact.save();

}


exports.updateContactFavorite = async (contactId, favorite, owner) => {
	const { _id: ownerId } = owner;

	const contact = await Contacts.findOneAndUpdate({ _id: contactId, owner: ownerId }, { favorite }, { new: true });

	if (!contact) {
		throw new HttpError(404, 'User not found');
	}



	return contact;
}


exports.contactFavorite = async (filter) => {
	const favorite = await Contacts.exists(filter);
	if (!favorite) throw new HttpError(404, 'User not found');
}


exports.checkContactExist = async (status) => {
	const contactExists = await Contacts.exists(status);

	if (contactExists) throw new HttpError(409, 'User Exists');
}

exports.checkContactIdIsValid = async (id) => {
	const idIsValid = Types.ObjectId.isValid(id);

	if (!idIsValid) throw new HttpError(404, 'User not found..');
}


exports.checkContactbyId = async (id) => {
	const idIsValid = Types.ObjectId.isValid(id);

	if (!idIsValid) throw new HttpError(404, 'User not found..');

	const userExists = await Contacts.exists({ _id: id });

	if (!userExists) throw new HttpError(404, 'User not found..');
}