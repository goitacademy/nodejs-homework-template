const { Contacts } = require("../db/contactsModel");
const { WrongParamerersError } = require("../helpers/errors");

const getContact = async () => {
  const contacts = await Contacts.find({});
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contacts.findById(id);
  if (!contact) {
    return WrongParamerersError(`Failure, contact with id:${id} is not found!`);
  }
  return contact;
};

const removeContactById = async (id) => {
  await Contacts.findByIdAndRemove(id);
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = await new Contacts({
    name,
    email,
    phone,
    favorite,
  });
  await contact.save();
};

const updateContactById = async (id, { name, email, phone, favorite }) => {
  await Contacts.findByIdAndUpdate(id, {
    $set: { name, email, phone, favorite },
  });
};

module.exports = {
  getContact,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
};
