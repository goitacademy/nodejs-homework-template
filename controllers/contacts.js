const fs = require("fs/promises");
const path = require("node:path");

const contactsPath = `${path.dirname("./db/contacts.json")}/${path.basename(
  "./db/contacts.json"
)}`;

const { Contact } = require("../models/contact.js");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById({ _id: contactId });
    return contact;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = new Contact({
      name: body.name,
      email: body.email,
      phone: body.phone,
    });
    await newContact.save();
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    return Contact.findByIdAndRemove({ _id: contactId });
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, updatedData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      {
        _id: contactId,
      },
      updatedData,
      { new: true }
    );
    return updatedContact;
  } catch (err) {
    console.log(err.message);
  }
};

const updateStatus = async (contactId, updatedData) => {
  console.log(updatedData);
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      updatedData,
      { new: true }
    );
    return updatedContact;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatus,
};