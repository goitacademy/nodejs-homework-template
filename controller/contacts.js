const Contact = require('../service/schemas/schemaMongoose')

/**
 * Returns list all contacts
 * @returns {Promise<Array>} Array contacts.
 */
const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
}

/**
 *  Returns contact by its id
 * @param {string} contactId - ID of the contact.
 * @returns {Promise<Object|null>} Object of contact or 'null' if contact is not found.
 */
const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new Error('Contact not found');
  }
  return contact;

}

/**
 * Deletes a contact by its ID
 * @param {string} contactId - ID of the contact.
 * @returns {Promise<Object|null>} Object of deleted contact or 'null' if contact is not found.
 */
const removeContact = async (contactId) => {
  const removedContact = await Contact.findByIdAndRemove(contactId);
  return removedContact;
}

/**
 * Adds a new contact to the list contacts.
 * @param {string} body - object.
 * @returns {Promise<Object>} The object of the added contact. 
 */
const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
}

/**
 * 
 * @param {*} contactId 
 * @param {*} body 
 * @returns 
 */
const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true });
  if (!updatedContact) {
    throw new Error('Contact not found');
  }
  return updatedContact;
}

const updateStatusContact = async (contactId, body) => {
  const updateStatus = await Contact.findByIdAndUpdate(contactId, body, { new: true });
  if (!updateStatus) {
    throw new Error('Contact not found');
  }
  return updateStatus;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
};
