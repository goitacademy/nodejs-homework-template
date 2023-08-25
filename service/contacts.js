import Contacts from "./schemas/contacts.js";

export const listContacts = () => {
  return Contacts.find();
};

export const getContactById = (contactId) => {
  return Contacts.findOne({ _id: contactId });
};

export const removeContact = (contactId) => {
  return Contacts.findByIdAndRemove({ _id: contactId });
};

export const addContact = (body) => {
  return Contacts.create(body);
};

export const updateContact = (contactId, body) => {
  return Contacts.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

export const updateFavContact = (contactId, body) => {
  return Contacts.findByIdAndUpdate(
    { _id: contactId },
    { $set: { favorite: true } },
    {
      new: true,
    }
  );
};
