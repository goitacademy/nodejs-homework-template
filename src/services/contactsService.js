import { Contact } from '../models/contactModel.js';

export const getContacts = async owner => {
  const contacts = await Contact.find({ owner });
  return contacts;
};

export const getContactById = async (contactId, owner) => {
  const contact = await Contact.findById({ _id: contactId, owner });
  return contact;
};

export const addContact = async (contactData, owner) => {
  const newContact = await Contact.create({ ...contactData, owner });
  return newContact;
};

export const updateContact = async (contactId, contactToUpdate, owner) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    contactToUpdate,
    { new: true }
  );

  return updatedContact;
};

export const updateContactStatus = async (contactId, favorite, owner) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    { favorite },
    { new: true }
  );

  return updatedContact;
};

export const deleteContact = async (contactId, owner) => {
  const deletedContact = await Contact.findByIdAndDelete({
    _id: contactId,
    owner,
  });
  return deletedContact;
};
