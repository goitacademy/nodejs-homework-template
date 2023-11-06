import { Contacts } from "./schemas/contact.js";

export const getAllContacts = async () => {
  return Contacts.find();
};
export const getByIdContact = async (id) => {
  return Contacts.findOne({ _id: id });
};
export const createContact = async (body) => {
  return Contacts.create({ ...body });
};
export const removeContact = async (id) => {
  return Contacts.findByIdAndRemove({ _id: id });
};
export const updateContact = async (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body);
};
export const updateStatusContact = async (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body);
};
