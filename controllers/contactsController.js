import Contact from '../models/contactsModel.js';

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    if (contact) {
      return contact;
    } else {
      throw new Error('Not found');
    }
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.deleteOne({ _id: contactId });
    if (result.deletedCount === 1) {
      return 'Contact deleted';
    } else {
      throw new Error('Not found');
    }
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (updatedContact) {
      return updatedContact;
    } else {
      throw new Error('Not found');
    }
  } catch (error) {
    throw error;
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true }
    );
    if (updatedContact) {
      return updatedContact;
    } else {
      throw new Error('Not found');
    }
  } catch (error) {
    throw error;
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
