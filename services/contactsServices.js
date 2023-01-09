const { Contacts } = require("../db/contactModel");

const getContacts = async () => {
  const contacts = await Contacts.find({});
  return contacts;
};

const getContactsById = async (id) => {
  const contact = await Contacts.findById(id);
  return contact;
};

const addContacts = async (body) => {
  const { name, email, phone, favorite } = body;
  const contact = new Contacts({ name, email, phone, favorite });
  await contact.save();
  return contact;
};

const updateContactsById = async (id, body) => {
  const { name, email, phone, favorite = false } = body;
  const updateContact = await Contacts.findByIdAndUpdate(id, {
    $set: { name, email, phone, favorite },
  });
  return updateContact
};

const deleteContactsById = async (id) => {
  const removeContact = await Contacts.findByIdAndDelete(id);
  return removeContact;
};

const updateFavoriteById = async (id, favorite) => {
  const updateFavorite = await Contacts.findByIdAndUpdate(id, {
    $set: { favorite },
  });
return updateFavorite
};

module.exports = {
  getContacts,
  getContactsById,
  addContacts,
  updateContactsById,
  deleteContactsById,
  updateFavoriteById,
};
