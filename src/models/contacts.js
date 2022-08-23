const { Contact } = require("../db/contactsSchema.js");

const listContacts = async (query, userId) => {
  let skip = Number(query?.page) * Number(query?.limit) - Number(query?.limit);
  if (skip < 0) skip = 0;
  try {
    const search = query?.favorite
      ? { owner: userId, favorite: query.favorite }
      : { owner: userId };
    const data = await Contact.find(search)
      .skip(skip)
      .limit(query?.limit)
      .select("-__v");
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getContactById = async (contactId, userId) => {
  try {
    return Contact.findOne({ _id: contactId, owner: userId }).select("-__v");
  } catch (err) {
    throw new Error(err.message);
  }
};

const removeContact = async (contactId, userId) => {
  try {
    const contact = await Contact.deleteOne({ _id: contactId, owner: userId });
    return contact;
  } catch (err) {
    throw new Error(err.message);
  }
};

const addContact = async (body, userId) => {
  const newContact = { ...body, owner: userId };
  try {
    const contact = await Contact.create(newContact);
    return await Contact.findById(contact._id).select("-__v");
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateContact = async (contactId, body, userId) => {
  try {
    return Contact.findOneAndUpdate({ _id: contactId, owner: userId }, body, {
      new: true,
    }).select("-__v");
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateStatusContact = async (contactId, body, userId) => {
  try {
    return Contact.findOneAndUpdate({ _id: contactId, owner: userId }, body, {
      new: true,
    }).select("-__v");
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
