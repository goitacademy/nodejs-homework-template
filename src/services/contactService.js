const { Contacts } = require("../db/contactsModel");
const { WrongParamerersError } = require("../helpers/errors");

const getContact = async (userId) => {
  const contacts = await Contacts.find({ userId });
  return contacts;
};

const getContactById = async (id, userId) => {
  const contact = await Contacts.findOne({ _id: id, userId });
  if (!contact) {
    throw new WrongParamerersError(
      `Failure, contact with id:${id} is not found!`
    );
  }
  return contact;
};

const removeContactById = async (id, userId) => {
  const contact = await Contacts.findOne({ _id: id, userId });
  if (!contact) {
    throw new WrongParamerersError(
      `Failure, contact with id:${id} is not found!`
    );
  }
  await Contacts.findOneAndRemove({ _id: id, userId });
};

const addContact = async ({ name, email, phone, favorite }, userId) => {
  const contact = await new Contacts({
    name,
    email,
    phone,
    favorite,
    userId,
  });
  await contact.save();
};

const updateContactById = async (
  id,
  { name, email, phone, favorite },
  userId
) => {
  const contact = await Contacts.findOne({ _id: id, userId });
  if (!contact) {
    throw new WrongParamerersError(
      `Failure, contact with id:${id} is not found!`
    );
  }
  await Contacts.findOneAndUpdate(
    { _id: id, userId },
    {
      $set: { name, email, phone, favorite },
    }
  );
};

module.exports = {
  getContact,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
};
