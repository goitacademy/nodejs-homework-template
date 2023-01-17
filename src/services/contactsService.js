const { Contact } = require("../db/contactModel");
const { WrongParamsError, NotAuthorizedError } = require("../helpers/errors");

const getContacts = async (userId) => {
  const contacts = await Contact.find({ userId });
  return contacts;
};
const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });

  if (!contact) {
    throw new WrongParamsError(`Contact with id ${userId} can't be found`);
  }
  return contact;
};
const addContact = async ({ name, email, phone, favorite }, userId) => {
  console.log(name);
  const contact = new Contact({ name, email, phone, favorite, userId });
  await contact.save();
};
const removeContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });
  if (!contact) {
    throw new WrongParamsError(`Contact with id ${contactId} can't be found`);
  }
};
const updateContact = async (
  contactId,
  { name, email, phone, favorite },
  userId
) => {
  await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    {
      $set: { name, email, phone, favorite },
    }
  );
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
