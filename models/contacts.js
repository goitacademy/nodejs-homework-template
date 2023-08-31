import Contacts from "../service/schemas/contacts.js";

export const listContacts = async (page, limit, filters) => {
  try {
    const skip = (page - 1) * limit;
    const query =
      filters.favorite !== undefined ? { favorite: filters.favorite } : {};
    return await Contacts.find(query).skip(skip).limit(limit);
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
