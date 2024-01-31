const { Contact } = require("./contacts.model");
const authService = require("../auth/auth.service");

const listContacts = async (userId) => {
  try {
    const contactsByUserId = await Contact.find({ owner: userId });
    return contactsByUserId;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const getContactById = async (id, userId) => {
  try {
    const contact = await Contact.findOne({ _id: id, owner: userId });
    return contact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const removeContact = async (id, userId) => {
  try {
    return await Contact.findOneAndDelete({ _id: id, owner: userId });
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

const updateContact = async (id, userId, modifiedContact) => {
  try {
    return await Contact.findOneAndUpdate(
      { _id: id, owner: userId },
      modifiedContact,
      { new: true }
    );
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const updateStatusContact = async (id, userId, modifiedContact) => {
  try {
    return await Contact.findOneAndUpdate(
      { _id: id, owner: userId },
      modifiedContact,
      { new: true }
    );
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
