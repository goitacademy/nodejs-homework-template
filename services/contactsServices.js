const { Contacts } = require("../db/contactModel");

const getContacts = async (userId, page, limit, filters) => {
  const contacts = await Contacts.find({ owner: userId, ...filters })
    .skip(page)
    .limit(limit);
  return contacts;
};

const getContactsById = async (postId, userId) => {
  const contact = await Contacts.findOne({ _id: postId, owner: userId });
  return contact;
};

const addContacts = async (body, userId) => {
  const { name, email, phone, favorite } = body;
  const contact = new Contacts({ name, email, phone, favorite, owner: userId });
  await contact.save();
  return contact;
};

const updateContactsById = async (postId, body, userId) => {
  const { name, email, phone, favorite = false } = body;
  const updateContact = await Contacts.findOneAndUpdate(
    { _id: postId, owner: userId },
    {
      $set: { name, email, phone, favorite },
    }
  );
  return updateContact;
};

const deleteContactsById = async (postId, userId) => {
  const removeContact = await Contacts.findOneAndDelete({
    _id: postId,
    owner: userId,
  });
  return removeContact;
};

const updateFavoriteById = async (postId, favorite, userId) => {
  const updateFavorite = await Contacts.findOneAndUpdate(
    { _id: postId, owner: userId },
    {
      $set: { favorite },
    }
  );
  return updateFavorite;
};

module.exports = {
  getContacts,
  getContactsById,
  addContacts,
  updateContactsById,
  deleteContactsById,
  updateFavoriteById,
};
