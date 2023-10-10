const contactsRepository = require('../models/contacts');



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

const updateContact = async (contactId, body) => {
  const updatedContact = contactsRepository.updateContact(contactId, body)
  return updatedContact;
}

const updateStatusContact = async (contactId, body) => {
  const updatedContact = contactsRepository.updateStatusContact(contactId, body)
  return updatedContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact
}