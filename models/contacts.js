const fs = require("fs/promises");
const { Contact } = require("../contact.schema");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findOne({ _id: contactId });
  return contact;
};

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndDelete({ _id: contactId });
  return result;
};

const addContact = async (body) => {
  const contact = new Contact({
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  });

  contact.save();
  return contact;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    {
      $set: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
    }
  );
  const contact = await Contact.findById(contactId);
  return contact;
};

const updateStatusContact = async (contactId, body) => {
  await Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    {
      $set: {
        favorite: body.favorite,
      },
    }
  );
  const contact = await Contact.findById(contactId);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
