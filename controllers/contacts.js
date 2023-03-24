const { Contact, contactValidationSchema } = require("../models/contacts.js");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const addContact = async (name, email, phone, favorite) => {
  try {
    const contact = new Contact({ name, email, phone, favorite });
    contact.save();
    return contact;
  } catch (err) {
    throw err;
  }
};

const getContactById = async (_id) => {
  const contact = await Contact.findOne({ _id });
  return contact;
};

const removeContact = async (_id) => {
  try {
    return Contact.findByIdAndDelete({ _id });
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (_id, newContact) => {
  const updatedContact = await Contact.findByIdAndUpdate(_id, newContact);
  return updatedContact;
};

const updateStatusContact = async (_id, favorite) => {
  const update = { favorite };
  const updatedContact = await Contact.findByIdAndUpdate(_id, update, {
    new: true,
  });
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
