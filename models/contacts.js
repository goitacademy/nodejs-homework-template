import Contact from '../service/schemas/contacts.js';

export const listContacts = async userId => {
  try {
    return await Contact.find({ owner: userId });
  } catch (err) {
    console.log('Error getting contact list: ', err);
    throw err;
  }
};

export const getContactById = async (userId, contactId) => {
  try {
    return await Contact.findOne({ owner: userId, _id: contactId });
  } catch (err) {
    console.log(`Error getting contact with id ${contactId}: `, err);
    throw err;
  }
};

export const removeContact = async (contactId, userId) => {
  try {
    return await Contact.findByIdAndRemove({ owner: userId, _id: contactId });
  } catch (err) {
    console.log(`Error removing contact with id ${contactId}: `, err);
    throw err;
  }
};

export const addContact = async (body, userId) => {
  try {
    const contactData = {
      ...body,
      owner: userId,
    };
    return await Contact.create(contactData);
  } catch (err) {
    console.log('Error adding new contact: ', err);
    throw err;
  }
};

export const updateContact = async (contactId, body, userId) => {
  try {
    return await Contact.findByIdAndUpdate({ owner: userId, _id: contactId }, body, { new: true });
  } catch (err) {
    console.error('An error occurred while updating contact: ', err);
    throw err;
  }
};

export const updatedStatusContact = async (contactId, favorite, userId) => {
  try {
    return await Contact.findByIdAndUpdate(
      { owner: userId, _id: contactId },
      { $set: { favorite: favorite } },
      { new: true }
    );
  } catch (err) {
    console.error('An error occurred while updating contact: ', err);
    throw err;
  }
};
