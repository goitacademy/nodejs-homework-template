const Contact = require('../models/contacts.shem');

const listContacts = async ownerId => {
  const contacts = await Contact.find(ownerId);
  return contacts;
};

const getContactById = async (contactId, ownerId) => {
  const contact = await Contact.findOne({ _id: contactId, owner: ownerId });
  return contact;
};

const addContact = async (name, email, phone, ownerId) => {
  const contact = await Contact.create({
    name: name,
    email: email,
    phone: phone,
    owner: ownerId,
  });
  return contact;
};

const removeContact = async (contactId, ownerId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    owner: ownerId,
  });
  return contact;
};

const updateContact = async (contactId, update, ownerId) => {
  const contact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: ownerId,
    },
    update,
    {
      new: true,
    },
  );
  return contact;
};

const updateFav = async (contactId, favorite, ownerId) => {
  const contact = await Contact.findByIdAndUpdate(
    {
      _id: contactId,
      owner: ownerId,
    },
    favorite,
    {
      new: true,
    },
  );
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFav,
};