const { Contact } = require("../db/contactModel");

const getListContacts = async (userId) => {
  const contacts = await Contact.find({ owner: userId });
  return contacts;
};

const getContactById = async ({ contactId, userId }) => {
  const contact = await Contact.findOne({ _id: contactId, owner: userId });
  return contact;
};

const removeContact = async ({ contactId, userId }) => {
  const contact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return contact;
};

const addContact = async ({ body, userId }) => {
  const { name, email, phone, favorite } = body;
  const contact = new Contact({
    name,
    email,
    phone,
    favorite,
    owner: userId,
  });
  return await contact.save();
};

const updateContact = async ({ contactId, userId }, { name, email, phone }) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    {
      name,
      email,
      phone,
    },
    { new: true }
  );
};

const updateStatusContact = async ({ contactId, userId }, { favorite }) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    {
      favorite,
    },
    { new: true }
  );
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
