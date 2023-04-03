const Contact = require('./contactsModel');

/**
 * read all contacts
 * @returns {Array}
 */
const listContacts = () => {
  return Contact.find().select('-_id');
};

/**
 * get contact by contact ID
 * @param {String } - id
 * @returns {Object }
 */
const getContactById = id => {
  return Contact.findById(id).select('-_id');
};

/**
 * add contact to db
 * @param {Object} - body
 * @returns {Object}
 */
const addContact = body => {
  return Contact.create(body);
};

/**
 * delete contact by contact ID
 * @param {String} - id
 */
const removeContact = id => {
  return Contact.findByIdAndDelete(id);
};

/**
 * update contact by contact ID
 * @param {String} - id,
 * @param {Object} - body
 * @returns {Object }
 */
const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
