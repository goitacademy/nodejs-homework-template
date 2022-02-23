const { Contact } = require("../db/contactModel");
const { WrongIdError } = require("../helpers/errors");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw new WrongIdError("Not found");
  }
};

const addContact = async (body) => {
  const { name, email, phone, favorite } = body;
  const contact = new Contact({
    name,
    email,
    phone,
    favorite,
  });
  await contact.save();
  return contact;
};

const changeContactById = async (contactId, body) => {
  const { name, email, phone, favorite } = body;

  try {
    await Contact.findByIdAndUpdate(contactId, {
      $set: { name, email, phone, favorite },
    });
    const changeContact = await Contact.findById(contactId);
    return changeContact;
  } catch (error) {
    throw new WrongIdError("Not found");
  }
};

const patchContactById = async (contactId, body) => {
  const { favorite } = body;

  try {
    await Contact.findByIdAndUpdate(contactId, {
      $set: { favorite },
    });
    const updateContact = await Contact.findById(contactId);
    return updateContact;
  } catch (error) {
    throw new WrongIdError("Not found");
  }
};

const removeContactById = async (contactId) => {
  try {
    await Contact.findByIdAndRemove(contactId);
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
