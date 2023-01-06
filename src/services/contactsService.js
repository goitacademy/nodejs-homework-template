import { Contact } from '../db/contactsModel.js';

export const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

export const getContactById = async contactId => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const addContact = async contactData => {
  const newContact = new Contact(contactData);
  const savedContact = await newContact.save();

  return savedContact;
};

export const updateContact = async (contactId, { name, phone, email }) => {
  await Contact.findByIdAndUpdate(contactId, {
    $set: { name, phone, email },
  });

  const updatedContact = await getContactById(contactId);
  return updatedContact;
};

export const deleteContact = async contactId => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  return deletedContact;
};
