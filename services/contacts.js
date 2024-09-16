import Contact from '../schemas/contacts.js';

const getAll = ({ filter, exact = false, showDeleted = false }, {owner}) => {
  const findFields = {owner};
  if (filter) {
    findFields.name = exact ? filter : new RegExp(filter, 'i');
  }
  if (!showDeleted) {
    findFields.isDeleted = { $ne: true };
  }

  return Contact.find(findFields).select({ __v: 0});
};

const getById = (id) => {
  return Contact.findById(id);
};

const addContact = (contact, {owner}) => {
  return Contact.create({...contact, owner});
};

const deleteContactById = (id) => {
  return Contact.findOneAndDelete(id, { isDeleted: true });
};

const updateContactById = (id, contact) => {
  return Contact.findByIdAndUpdate(id, contact, {
    new: true,
    // overwrite: true,
  });
};

export default {
  getAll,
  getById,
  addContact,
  deleteContactById,
  updateContactById,
};
