// const fs = require('fs/promises')
// const { readFile, writeFile } = require("fs").promises;

// const path = require("path");
// const contactsPath = path.join(__dirname, "contacts.json");
const Contact = require('./contact')

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    if (contact) {
      return contact;
    }
    throw new Error("Contact not found");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const addContact = async (body) => {
  try {
    const newContact = new Contact(body);
    const savedContact = await newContact.save();
    return savedContact;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const removeContact = async (contactId) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (deletedContact) {
      return deletedContact;
    }
    throw new Error("Not found");
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      body,
      { new: true }
    );
    if (updatedContact) {
      return updatedContact;
    }
    throw new Error("Contact not found");
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const updateStatusContact = async (contactId, body) => {
  try {
    
    if (!body.favorite) {
      throw new Error("Отсутствует поле 'favorite'");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true }
    );

    if (updatedContact) {
      return updatedContact;
    }

    throw new Error("Контакт не найден");
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
