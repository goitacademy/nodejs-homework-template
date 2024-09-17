import * as contactsModel from '../models/contactModel.js';

const updateStatusContact = async (contactId, { favorite }) => {
  try {
    const updatedContact = await contactsModel.updateStatusContact(contactId, {
      favorite,
    });

    if (!updatedContact) {
      throw new Error('Contact not found');
    }

    return updatedContact;
  } catch (error) {
    console.error('Error updating contact status:', error.message);
    throw error;
  }
};

export default updateStatusContact;
