import { Contact } from "./contacts.model.js";

export const getAllContact = async () => {
  return await Contact.find({});
};

export const getContact = async (contactId) => {
  return await Contact.findById(contactId);
};

export const addContact = async (contact) => {
  const newContact = new Contact(contact);
  return await newContact.save();
};

export const addContacts = async (contacts) => {
  return await Contact.insertMany(contacts);
};

export const patchContact = async (contactId, partialContact) => {
  return await Contact.findOneAndUpdate(contactId, partialContact, {
    new: true,
  });
};``

export const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};
