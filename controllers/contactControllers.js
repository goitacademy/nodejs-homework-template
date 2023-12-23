
const contactControllers = require('../servises');

exports.getContacts = contactControllers.contactServise.listContacts;

exports.getContact = contactControllers.contactServise.getContactById;

exports.newContact = contactControllers.contactServise.addContact;

exports.deleteContact = contactControllers.contactServise.removeContact;

exports.updateContact = contactControllers.contactServise.updateContact;

exports.updatefavorite = contactControllers.contactServise.updateContactFavorite;