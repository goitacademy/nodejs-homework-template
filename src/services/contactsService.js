import { Contact } from '../models/contactModel.js';

export const getContacts = async (owner, { page, limit, favorite }) => {
  const skip = limit * (page - 1);

  const filterFields = { owner };
  if (favorite) filterFields.favorite = favorite;

  const contacts = await Contact.find(filterFields, {
    owner: 0,
    createdAt: 0,
    updatedAt: 0,
  })
    .skip(skip)
    .limit(limit);

  return contacts;
};

export const getContactById = async (contactId, owner) => {
  const contact = await Contact.findById(
    { _id: contactId, owner },
    { owner: 0, createdAt: 0, updatedAt: 0 }
  );
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
    { new: true, fields: { owner: 0, createdAt: 0, updatedAt: 0 } }
  );

  return updatedContact;
};

export const updateContactStatus = async (contactId, favorite, owner) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    { favorite },
    { new: true, fields: { owner: 0, createdAt: 0, updatedAt: 0 } }
  );

  return updatedContact;
};

export const deleteContact = async (contactId, owner) => {
  const deletedContact = await Contact.findByIdAndDelete(
    { _id: contactId, owner },
    { fields: { name: 1, email: 1 } }
  );
  return deletedContact;
};
