import Contact from '../schemas/contact.js';

const getAll = ({ filter, exact = false, showDeleted = false }) => {
  const findFields = {};
  if (filter) {
    findFields.name = exact ? filter : new RegExp(filter, 'i');
  }
  if (!showDeleted) {
    findFields.isDeleted = { $ne: true };
  }

  return Contact.find(findFields);
};

const getById = id => {
  return Contact.findById(id);
};

const addContact = contact => {
  return Contact.create(contact);
};

const deleteContactById = id => {
  return Contact.findByIdAndUpdate(id, { isDeleted: true });
};

const updateContactById = (id, contact) => {
  return Contact.findByIdAndUpdate(id, contact, {
    new: true,
    // overwrite: true,
  });
};

const contactsServices = {
  getAll,
  getById,
  addContact,
  deleteContactById,
  updateContactById,
};

export default contactsServices;
