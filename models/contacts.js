const Contact = require("./contactModel");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body);
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove(contactId);
  return contact;
};

const updateStatusContact = async (contactId, favorite) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: { favorite },
    },
    {
      returnDocument: "after",
    }
  );

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
