import { Contact } from '../models/contactModel.js';

export const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

export const getContactById = async contactId => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const addContact = async contactData => {
  const newContact = await Contact.create(contactData);
  return newContact;
};

export const updateContact = async (contactId, contactToUpdate) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    contactToUpdate,
    { new: true }
  );

  return updatedContact;
};

export const updateContactStatus = async (contactId, favorite) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  return updatedContact;
};

export const deleteContact = async contactId => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  return deletedContact;
};
