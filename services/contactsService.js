const { Contact } = require("../db/contactModel");
const { WrongIdError } = require("../helpers/errors");

const listContacts = async (owner, { skip, limit, favorite }) => {
  const contacts = await Contact.find({
    owner,
    favorite: favorite ? JSON.parse(favorite) : { $in: [true, false] },
  })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit);
  return contacts;
};

const getContactById = async (owner, contactId) => {
  try {
    const contact = await Contact.findOne({ owner, _id: contactId });
    return contact;
  } catch (error) {
    throw new WrongIdError("Not found");
  }
};

const addContact = async (owner, body) => {
  const { name, email, phone, favorite } = body;
  const contact = new Contact({
    name,
    email,
    phone,
    favorite,
    owner,
  });
  await contact.save();
  return contact;
};

const changeContactById = async (owner, contactId, body) => {
  const { name, email, phone, favorite } = body;

  try {
    await Contact.findOneAndUpdate(
      { owner, _id: contactId },
      { $set: { name, email, phone, favorite } }
    );
    const changeContact = await Contact.findOne({ owner, _id: contactId });
    return changeContact;
  } catch (error) {
    throw new WrongIdError("Not found");
  }
};

const patchContactById = async (owner, contactId, body) => {
  const { favorite } = body;

  try {
    await Contact.findOneAndUpdate(
      { owner, _id: contactId },
      { $set: { favorite } }
    );
    const updateContact = await Contact.findOne({ owner, _id: contactId });
    return updateContact;
  } catch (error) {
    throw new WrongIdError("Not found");
  }
};

const removeContactById = async (owner, contactId) => {
  try {
    await Contact.findOneAndRemove({ owner, _id: contactId });
  } catch (error) {
    throw new WrongIdError("Not found");
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  changeContactById,
  patchContactById,
  removeContactById,
};
