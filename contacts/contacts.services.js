const { Contact } = require("./contacts.model");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const getContactById = async (id) => {
  try {
    return await Contact.findById(id);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const removeContact = async (id) => {
  try {
    return await Contact.findByIdAndDelete(id);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const addContact = async (contact) => {
  try {
    const newContact = new Contact(contact);
    const savedContact = await newContact.save();
    return savedContact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const updateContact = async (id, modifiedContact) => {
  try {
    return await Contact.findByIdAndUpdate(id, modifiedContact, { new: true });
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const updateStatusContact = async (id, modifiedContact) => {
  try {
    return await Contact.findByIdAndUpdate(id, modifiedContact, { new: true });
  } catch (error) {
    console.log(error.message);
    return null;
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
