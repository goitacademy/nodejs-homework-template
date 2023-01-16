const fs = require("fs/promises");
const path = require("path");
const { Contacts } = require("../db/contactsModel");
const contactsPath = path.resolve("./src/models/contacts.json");

const listContacts = async () => {
  try {
    const data = await Contacts.find();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await Contacts.findById(contactId);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await Contacts.findByIdAndRemove(contactId);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addContact = async (body) => {
  try {
    const user = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      favorite: body.favorite ? body.favorite : false,
    };
    const contact = new Contacts(user);
    await contact.save();
    return contact;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  try {
    await Contacts.findByIdAndUpdate(contactId, {
      $set: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        favorite: body.favorite,
      },
    });
    const data = await Contacts.findById(contactId);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    await Contacts.findByIdAndUpdate(contactId, {
      favorite: body.favorite,
    });
    const data = await Contacts.findById(contactId);
    return data;
  } catch (error) {
    console.log(error);
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
