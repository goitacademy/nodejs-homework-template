const { Contact } = require("../db/model");

const listContacts = async () => {
  try {
    const data = await Contact.find({});
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await Contact.findById(contactId);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    await Contact.findByIdAndDelete(contactId);
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (body) => {
  try {
    const newContact = new Contact(body);
    await newContact.save();
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: body },
      { new: true }
    );

    return contact;
  } catch (err) {
    console.error(err);
  }
};

const updateContactStatus = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: body },
    { new: true }
  );

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
