import Contact from "../models/Contact.js";
import { HttpError } from "../utils/HttpError.js";

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  return contact;
};

const removeContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    throw new HttpError(404, "Not found");
  }

  return deletedContact;
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body);
  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }

  return updateContact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
