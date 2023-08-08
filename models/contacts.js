// const fs = require('fs/promises')
const fs = require("fs");
const path = require("path");
const { v1: uuidv1 } = require("uuid");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {  try {
    return fs.readFileSync(contactsPath);
  } catch (err) {
    console.log(err.message);
  }}

const getContactById = async (contactId) => {
  try {
    const contacts = JSON.parse(fs.readFileSync(contactsPath));
    const searchContact = contacts.find((elem) => elem.id === contactId);
    console.log(searchContact);
    return searchContact;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => { try {
    const contacts = await JSON.parse(fs.readFileSync(contactsPath));
    const contactToRemoveIndex = contacts.findIndex(
      (elem) => elem.id === contactId
    );
    if (contactToRemoveIndex === -1) {
      return false;
    } else {
      const newContactsData = contacts.filter((elem) => elem.id !== contactId);
      fs.writeFileSync(contactsPath, JSON.stringify(newContactsData));
      return true;
    }
  } catch (err) {
    console.log(err.message);
  }}

const addContact = async (body) => { const name = body.name;
  const email = body.email;
  const phone = body.phone;
  if (name && email && phone) {
    try {
      const newContact = {
        id: uuidv1(),
        name: name,
        email: email,
        phone: phone,
      };
      const contacts = await JSON.parse(fs.readFileSync(contactsPath));
      const isNameUnique = !contacts.some((elem) => elem.name === name);
      if (!isNameUnique) return 4;
      contacts.push(newContact);
      fs.writeFileSync(contactsPath, JSON.stringify(contacts));
      return 1;
    } catch (err) {
      console.log(err);
      return 3;
    }
  } else {
    return 2;
  }}

const updateContact = async (contactId, body) => {
  const name = body.name;
  const email = body.email;
  const phone = body.phone;
  const contacts = await JSON.parse(fs.readFileSync(contactsPath));
  const shouldUpdate = (prevName, prevMail, prevPhone) =>
    name !== prevName || email !== prevMail || phone !== prevPhone;
  let message;
  contacts.find((elem) => {
    if (elem.id === contactId) {
      if (shouldUpdate(elem.name, elem.email, elem.phone)) {
        elem.name = name;
        elem.email = email;
        elem.phone = phone;
        message = { name: name, email: email, phone: phone };
        fs.writeFileSync(contactsPath, JSON.stringify(contacts));
        return contacts;
      } else {
        message = {
          message: "Contact data is the same, please check it and try again",
        };
        return contacts;
      }
    } else {
      message = { message: "Nothing to Update" };
      return null;
    }
  });
  return message
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
