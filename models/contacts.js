const { Contact } = require("./contact.model");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  console.log(contactId);
  const contactToShow = await Contact.findById(contactId);
  return contactToShow;
};

const removeContact = async (contactId) => {
  const removedContact = await Contact.findByIdAndDelete(contactId);
  return removedContact;
};

const addContact = async (body) => {
  const { name, email, phone, favorite } = body;
  const newContactInfo = {
    name,
    email,
    phone,
    favorite: favorite || false,
  };
  const newContact = await Contact.create(newContactInfo);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return updatedContact;
};

const updateStatusContact = async (contactId, body) => {
  console.log(contactId);
  console.log(body);
  const updatedStatus = await Contact.findByIdAndUpdate(contactId, body, {
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
