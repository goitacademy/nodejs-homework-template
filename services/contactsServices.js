const { Contact } = require("../db/contactsModel");
const {WrongParametersError} = require("../helpers/errors");

const getContacts = async () => {    
  const contacts = await Contact.find({});  
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new WrongParametersError(`Not found such id ${id}`);
  }
  return contact;
};

const addContact = async ({ name, phone, email, favorite }) => {
  const contact = new Contact({ name, phone, email, favorite });
  await contact.save();
};
const deleteContactById = async (id) => {
  await Contact.findByIdAndRemove(id);
};
const putContactById = async (id, { name, email, phone }) => {
  await Contact.findByIdAndUpdate(id, { $set: { name, email, phone } });
};
const updateStatusContactById = async (id, { favorite }) => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    { $set: { favorite } },
    { new: true }
  );
  return contact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  putContactById,
  updateStatusContactById,
};
