import Contact from "../schemas/contact.js";

export const listContacts = async () => {
  return Contact.find();
};

export const getContactById = (contactId) => {
  return Contact.findOne({ _id: contactId });
};

export const addContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

export const updateContact = (contactId, fields) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, fields, { new: true });
};

export const updateStatusContact = (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body);
};

export const removeContact = (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
};
