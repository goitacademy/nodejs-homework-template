const { Contacts } = require("./contactsShema");

const listContacts = async () => {
  const data = await Contacts.find();
  return data;
};

const getContactById = async (contactId) => {
  const data = await Contacts.findById(contactId);
  return data;
};

const addContact = async (body) => {
  const newContact = new Contacts(body);
  const data = await newContact.save();
  return data;
};

const removeContact = async (contactId) => {
  const data = await Contacts.findByIdAndRemove(contactId);
  return data;
};

const updateContact = async (contactId, body) => {
  const data = await Contacts.findByIdAndUpdate(
    contactId,
    { $set: body },
    { new: true }
  );
  return data;
};

const togleFavorite = async (contactId, body) => {
  // const { favorite } = body;
  const data = await Contacts.findByIdAndUpdate(
    contactId,
    { $set: body },
    { new: true }
  );
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  togleFavorite,
};
