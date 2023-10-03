const ERROR_TYPES = require('../constants/errors');
const contactsRepository = require('../models/contacts');
const createError = require('../utils/createError');



const listContacts = async () => {
    const contacts = await contactsRepository.listContacts();
    return contacts;
}

const getContactById = async (contactId) => {
    const contact = await contactsRepository.getContactById(contactId);
    return contact;
};

const removeContact = async (contactId) => {
    const newContacts = await contactsRepository.removeContact(contactId);
    return newContacts;
}

const addContact = async (body) => {
    const contact = contactsRepository.addContact(body)
    return contact;
};


const checkRequiredFields = (body, fields) => {
  for (const field of fields) {
    if (!body[field]) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: `missing required ${field} field`,
      });
      throw error;
    }
  }
};


const updateContact = async (contactId, body) => {
  const updatedContact = contactsRepository.updateContact(contactId, body)
  return updatedContact;
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    checkRequiredFields,
    updateContact,
}