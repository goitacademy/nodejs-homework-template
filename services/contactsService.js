const { Contact } = require("../db/contactModel");

const getContacts = async (userId, { page, limit, fav }) => {
  if (!fav) {
    const contacts = await Contact.find({ owner: userId })
      .select({ __v: 0, owner: 0, _id: 0 })
      .skip(page === 1 ? (page - 1) * limit : 0)
      .limit(limit);
    return contacts;
  } else {
    const contacts = await Contact.find({ owner: userId, favorite: fav })
      .select({ __v: 0, owner: 0, _id: 0 })
      .skip(page === 1 ? (page - 1) * limit : 0)
      .limit(limit);
    return contacts;
  }
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findById({ _id: contactId, owner: userId });
  if (!contact) {
    throw new WrongParametersError(
      `failute, no post with id '${contactId}' found!`
    );
  }
  return contact;
};

const addContact = async ({ name, email, phone }, userId) => {
  const contact = new Contact({ name, email, phone, owner: userId });
  await contact.save();
};

const updateContact = async (contactId, { name, email, phone }, userId) => {
  await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { $set: { name, email, phone } }
  );
};

const removeContactById = async (contactId, userId) => {
  await Contact.findByIdAndRemove({ _id: contactId, owner: userId });
};

const updateStatusContact = async (contactId, { favorite }, userId) => {
  await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { favorite: true }
  );
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContactById,
  updateStatusContact,
};
