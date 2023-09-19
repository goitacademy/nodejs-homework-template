import { ContactModel } from "../schemas/contactsSchema.js";

export const listContacts = async () => {
  const data = await ContactModel.find();
  return data;
};

export const getContactById = async (contactId) => {
  const data = await ContactModel.findById(contactId);
  return data;
};

export const addNewContact = async (body) => {
  const newContact = await ContactModel.create(body);
  return newContact;
};

export const removeContact = async (contactId) => {
  const result = await ContactModel.findByIdAndRemove({ _id: contactId });
  return result;
};

export const updateContact = async (contactId, body) => {
  const updatedContact = await ContactModel.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  return updatedContact;
};
