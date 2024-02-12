import { Contact } from "./schemas/contacts.js";

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findOne({ _id: id });
};

const getContactByName = async (name) => {
  return Contact.findOne({ name: name });
};

const createContact = async ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateContact = async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = async (id) => {
  return Contact.findByIdAndDelete({ _id: id });
};

const updateStatusContact = async (id, favourite) => {
  return Contact.findByIdAndUpdate({ _id: id }, favourite, { new: true });
};

export {
  getAllContacts,
  getContactById,
  getContactByName,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
