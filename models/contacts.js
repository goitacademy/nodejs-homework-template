const { Contact } = require("./contact.model");

const listContacts = async (ownerId) => {
  const findQuery = {
    owner: ownerId,
  };
  const contacts = await Contact.find(findQuery);
  return contacts;
};

const getContactById = async (ownerId, contactId) => {
  const findQuery = {
    _id: contactId,
    owner: ownerId,
  };
  const contactToShow = await Contact.find(findQuery);
  return contactToShow;
};

const removeContact = async (ownerId, contactId) => {
  const findQuery = {
    _id: contactId,
    owner: ownerId,
  };
  const removedContact = await Contact.findOneAndDelete(findQuery);
  return removedContact;
};

const addContact = async (body, ownerId) => {
  const { name, email, phone, favorite } = body;
  const newContactInfo = {
    name,
    email,
    phone,
    favorite: favorite || false,
    owner: ownerId,
  };
  const newContact = await Contact.create(newContactInfo);
  return newContact;
};

const updateContact = async (contactId, body, ownerId) => {
  const findQuery = {
    _id: contactId,
    owner: ownerId,
  };
  const updatedContact = await Contact.findOneAndUpdate(findQuery, body, {
    new: true,
  });
  return updatedContact;
};

const updateStatusContact = async (contactId, body, ownerId) => {
  const findQuery = {
    _id: contactId,
    owner: ownerId,
  };
  const updatedStatus = await Contact.findOneAndUpdate(findQuery, body, {
    new: true,
  });
  return updatedStatus;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
