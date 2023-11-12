const  Contact  = require("../models/contact");

const listContacts = async () => {
  try {
    const contacts = await Contact.find({});
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const findedContact = Contact.findById(contactId);
    if (!findedContact) {
      return null;
    }
    return findedContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const deletedContact = Contact.findByIdAndDelete(contactId);
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactToUpdate = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return contactToUpdate;
  } catch (error) {
    console.log(error);
  }
};

const updateStatusContact = async (contactId, favorite) => {
  try {
    const contactWithUpdatedStatus = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
    return contactWithUpdatedStatus;
  } catch (error) {
    console.log(error);
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