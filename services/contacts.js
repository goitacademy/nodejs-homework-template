import Contact from "../models/Contact.js";
import { HttpError } from "../utils/HttpError.js";

const listContacts = async ({ owner }) => {
  return await Contact.find( {owner});
};

const getContactById = async ({_id: contactId, owner}) => {
  const contact = await Contact.findById({_id: contactId, owner});
  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  return contact;
};

const removeContact = async ({_id: contactId, owner}) => {
  const deletedContact = await Contact.findByIdAndDelete({
    _id: contactId,
    owner,
  });
  if (!deletedContact) {
    throw new HttpError(404, "Not found");
  }

  return deletedContact;
};

const addContact = async ({body, owner }) => {
  return await Contact.create({...body, owner});
};

const updateContact = async ({_id: contactId, owner}, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    body
  );
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
