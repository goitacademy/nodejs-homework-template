const { Contact } = require("../db/contactModel");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new WrongParametersError(`failute, no post with id '${id}' found!`);
  }
  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const contact = new Contact({ name, email, phone });
  await contact.save();
};

const updateContact = async (id, { $set: { name, email, phone } }) => {
  await Contact.findByIdAndUpdate(id, { $set: { name, email, phone } });
};

const removeContactById = async (id) => {
  await Contact.findByIdAndRemove(id);
};

const updateStatusContact = async (id, { favorite }) => {
  await Contact.findByIdAndUpdate(id, { favorite });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContactById,
  updateStatusContact,
};
