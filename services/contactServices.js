const { Types } = require('mongoose');

const Contact = require('../models/contacts.models');
const { AppError } = require('../utils');

/**
 * Check if contact exists service.
 * @param {Object} filter
 * @returns {Promise<void>}
 */
exports.contactExists = async (filter) => {
  const contactExists = await Contact.exists(filter);

  if (contactExists) throw new AppError(409, 'Contact already exists..');
};

/**
 * Check if  contact by id exists service.
 * @param {string} id
 * @returns {Promise<void>}
 */
exports.contactExistsById = async (id) => {
  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) throw new AppError(404, 'Contact does not exist..');

  const contactExists = await Contact.exists({ _id: id });

  if (!contactExists) throw new AppError(404, 'Contact does not exist..');
};

/**
 * Update contact data service.
 * @param {string} id
 * @param {Object} contactData
 * @returns {Promise<Contact>}
 */
exports.updateContact = async (id, contactData) => {
  const contact = await Contact.findById(id);

  Object.keys(contactData).forEach((key) => {
    contact[key] = contactData[key];
  });

  return contact.save();
};

/**
 * Create contact service.
 * @param {Object} contactData
 * @returns {Promise<contact>}
 */
exports.createContact = async (contactData) => {
  const newContact = await Contact.create(contactData);

  newContact.password = undefined;

  return newContact;
};

/**
 * Get contacts service.
 * @returns {Promise<Contact[]>}
 */
exports.getAllContacts = () => Contact.find();

/**
 * Get contact by id service.
 * @param {string} id
 * @returns {Promise<Contact>}
 */
exports.getContactById = (id) => Contact.findById(id);

/**
 * Delete contact by id service.
 * @param {string} id
 * @returns {Promise<void>}
 */
exports.deleteContactById = (id) => Contact.findByIdAndDelete(id);