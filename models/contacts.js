// const fs = require('fs/promises')
import { Contact } from "../service/schemas/Contact.js";

export const listContacts = async () => {
  try {
    const result = await Contact.find();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const listFavoriteContacts = async (favorite) => {
  try {
    const result = await Contact.find({ favorite: favorite });

    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export const getContactById = async (contactId) => {
  try {
    const result = await Contact.findOne({ _id: contactId });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeContact = async (contactId) => {
  return Contact.findByIdAndDelete({ _id: contactId });
};

export const addContact = async (body) => {
  return Contact.create(body);
};

export const updateContact = async (contactId, fields) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId },
    { $set: fields },
    { new: true }
  );
};
