
const contactControllers = require('./contactControllers')


exports.getContacts = contactControllers.listContacts;

exports.getContact = contactControllers.getContactById;

exports.newContact = contactControllers.addContact;

exports.deleteContact = contactControllers.removeContact;

exports.updateContact = contactControllers.updateContact;

exports.updatefavorite = contactControllers.updateContactFavorite;