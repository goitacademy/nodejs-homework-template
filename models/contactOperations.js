import ContactModel from "./contactModel.js";

export const listContacts = async () => {
  return await ContactModel.find({});
};

export const getContactById = async (contactId) => {
  return await ContactModel.findById(contactId);
};

export const removeContact = async (contactId) => {
  return await ContactModel.findByIdAndRemove(contactId);
};

export const addContact = async (body) => {
  return await ContactModel.create(body);
};

export const updateContact = async (contactId, body) => {
  return await ContactModel.findByIdAndUpdate(
    contactId,
    { $set: body },
    { new: true }
  );
};

export const updateFavoriteStatus = async (contactId, body) => {
  return await ContactModel.findByIdAndUpdate(
    contactId,
    { $set: body },
    { new: true }
  );
};
