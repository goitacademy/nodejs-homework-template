const Contact = require('../models/contact');

const getContacts = async () => {
  return await Contact.find({});
};

const getContactById = async contactId => {
  const contact = await Contact.findById(contactId).catch(() => {
    return null;
  });

  return contact;
};

const createContact = async ({ name, email, phone, favorite = false }) => {
  return await Contact.create({ name, email, phone, favorite });
};

const updateContactById = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  }).catch(() => {
    return null;
  });

  return updatedContact;
};

const toggleFavoriteById = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  }).catch(() => {
    return null;
  });

  return updatedContact;
};

const deleteContactById = async contactId => {
  const deletedContact = await Contact.findByIdAndRemove(contactId).catch(
    () => {
      return null;
    }
  );

  return deletedContact;
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContactById,
  toggleFavoriteById,
  deleteContactById,
};
