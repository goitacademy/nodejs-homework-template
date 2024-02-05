// models/contacts/contacts.js
import { Contact } from './contactSchema.js';

export const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw error;
  }
}

export const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw error;
  }
}

export const removeContact = async (contactId) => {
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    return result !== null;
  } catch (error) {
    throw error;
  }
}

export const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    throw error;
  }
}

export const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    return updatedContact;
  } catch (error) {
    throw error;
  }
}

export const updateFavoriteStatus = async (contactId, body) => {
  if (!body || body.favorite === undefined) {
    return { status: 400, message: 'missing field favorite"' };
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true }
    );

    if (updatedContact) {
      return { status: 200, contact: updatedContact };
    } else {
      return { status: 404, message: 'Not found' };
    }
  } catch (error) {
    throw error;
  }
};

