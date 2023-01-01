const { Contact } = require("../db/contactModel");
const { WrongParamsError } = require("../helpers/errors");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};
const getContactById = async (id) => {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new WrongParamsError(`Contact with id ${id} can't be found`);
  }
  return contact;
};
const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
};
const removeContact = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    throw new WrongParamsError(`Contact with id ${id} can't be found`);
  }
};
const updateContact = async () => {
  await Contact.findByIdAndUpdate(id, {
    $set: { name, email, phone, favorite },
  });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
