const Contact = require("./model");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  const contact = await Contact.findOne({ _id: contactId });
  return contact;
};

const removeContact = async (contactId) => {
  const deletedContact = Contact.findOneAndDelete({ _id: contactId });
  return deletedContact;
};

const addContact = async (body) => {
  const newContact = Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const updatedContact = Contact.findOneAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return updatedContact;
};

const updateFavorite = async (contactId, body) => {
  const updatedFavoriteContact = Contact.findOneAndUpdate(
    { _id: contactId },
    body,
    { new: true }
  );
  return updatedFavoriteContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
