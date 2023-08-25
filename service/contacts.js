import Contacts from "./schemas/contacts.js";

export const listContacts = async () => {
  try {
    return await Contacts.find();
  } catch (err) {
    console.log(err);
  }
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

export const updateStatus = (contactId, body) => {
  return Contacts.findByIdAndUpdate(
    { _id: contactId },
    { $set: { favorite: true } },
    {
      new: true,
    }
  );
};
