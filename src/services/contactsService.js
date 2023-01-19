const jwt = require("jsonwebtoken");
const { Contact } = require("../db/contactModel");
const { WrongParamsError, NotAuthorizedError } = require("../helpers/errors");

const getContacts = async (token) => {
  if (!token) throw new NotAuthorizedError("Authorization error");

  const { _id: userId } = jwt.verify(token, process.env.JWT_SECRET);
  const contacts = await Contact.find({ userId });

  return contacts;
};

const getContactById = async (contactId, token) => {
  if (!token) throw new NotAuthorizedError("Authorization error");

  const { _id: userId } = jwt.verify(token, process.env.JWT_SECRET);
  const contact = await Contact.findOne({ _id: contactId, userId });

  if (!contact) {
    throw new WrongParamsError(`Contact with id ${userId} can't be found`);
  }
  return contact;
};

const addContact = async ({ name, email, phone, favorite }, token) => {
  if (!token) throw new NotAuthorizedError("Authorization error");

  const { _id: userId } = jwt.verify(token, process.env.JWT_SECRET);
  const contact = new Contact({ name, email, phone, favorite, userId });

  await contact.save();
};

const removeContact = async (contactId, token) => {
  if (!token) throw new NotAuthorizedError("Authorization error");

  const { _id: userId } = jwt.verify(token, process.env.JWT_SECRET);
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });

  if (!contact) {
    throw new WrongParamsError(`Contact with id ${contactId} can't be found`);
  }
};
const updateContact = async (
  contactId,
  { name, email, phone, favorite },
  token
) => {
  if (!token) throw new NotAuthorizedError("Authorization error");

  const { _id: userId } = jwt.verify(token, process.env.JWT_SECRET);

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
