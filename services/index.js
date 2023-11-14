import Contact from "./schemas/contacts.js";

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = async ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = async ({ id, fields }) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = async (id) => {
  return Contact.findByIdAndRemove({ contactId: id });
};

export {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
