import Contacts from "../service/schemas/contacts.js";

export const listContacts = async (page, limit, filters, userID) => {
  try {
    const skip = (page - 1) * limit;
    const query = {
      ...(filters.favorite !== undefined ? { favorite: filters.favorite } : {}),
      owner: userID,
    };
    return await Contacts.find(query).skip(skip).limit(limit);
  } catch (err) {
    console.log(err);
  }
};

export const getContactById = (contactId, userID) => {
  return Contacts.findOne({ _id: contactId, owner: userID });
};

export const removeContact = (contactId, userID) => {
  return Contacts.findByIdAndRemove({ _id: contactId, owner: userID });
};

export const addContact = (body, userID) => {
  return Contacts.create(body, userID);
};

export const updateContact = (contactId, body, userID) => {
  return Contacts.findByIdAndUpdate({ _id: contactId, owner: userID }, body, {
    new: true,
  });
};

export const updateStatus = (contactId, body, userID) => {
  return Contacts.findByIdAndUpdate(
    { _id: contactId, owner: userID },
    { $set: { favorite: true } },
    {
      new: true,
    }
  );
};
