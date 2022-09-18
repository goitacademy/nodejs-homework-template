const { Contact } = require("../db/contactsModel");

const listContacts = async () => {
  const data = await Contact.find({});
  return data;
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    return error.message;
  }
};

const removeContact = async (contactId) => {
  try {
    const contact = await Contact.findByIdAndDelete(contactId);

    return contact;
  } catch (error) {
    return error.message;
  }
};

const addContact = async (body) => {
  try {
    const contact = new Contact(body);
    await contact.save();

    return contact;
  } catch (error) {
    return error.message;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;

    await Contact.findByIdAndUpdate(contactId, {
      $set: { name, email, phone },
    });
    const contact = await Contact.findById(contactId);

    return contact;
  } catch (error) {
    return error.message;
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const { favorite } = body;

    await Contact.findByIdAndUpdate(contactId, {
      $set: { favorite },
    });
    const contact = await Contact.findById(contactId);

    return contact;
  } catch (error) {
    return error.message;
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
