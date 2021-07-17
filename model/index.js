const fs = require("fs/promises");
const path = require("path");
const { nextTick } = require("process");
const contacts = require("./contacts.json");
const { Contact } = require("../db/contactsModel");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  let contactsList;
  try {
    contactsList = await Contact.find({});
  } catch (error) {
    console.error(error);
  }
  return contactsList;
};

const getContactById = async (contactId) => {
  try {
    let findContact = await Contact.findById(contactId);
    return findContact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    let newListAfterRemove;
    let removeStatus = false;
    await Contact.findByIdAndRemove(contactId);
    removeStatus = true;
    return removeStatus;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  const { name, email, phone, favorite } = body;
  try {
    let newContact = new Contact({ name, email, phone, favorite });
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone, favorite } = body;
  try {
    await Contact.findByIdAndUpdate(contactId, {
      $set: { name, email, phone, favorite },
    });
    return await getContactById(contactId);
  } catch (error) {
    console.error(error);
  }
};
const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;
  try {
    await Contact.findByIdAndUpdate(contactId, {
      $set: { favorite },
    });
    return await getContactById(contactId);
  } catch (error) {
    console.error(error);
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
