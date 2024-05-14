const fs = require("fs").promises;
const crypto = require("crypto");

/* const { json } = require('express'); */

const contactsPath = "./models/contacts.json";

const listContacts = async () => {
  return fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err.message));
};

const getContactById = async (contactId) => {
  return fs
    .readFile(contactsPath)
    .then(
      (data) =>
        (newData = JSON.parse(data).filter((item) => item.id == contactId))
    )
    .catch((err) => console.log(err.message));
};

const removeContact = async (contactId) => {
  return fs
    .readFile(contactsPath)
    .then((data) => {
      const object = JSON.parse(data);
      const newData = object.filter((item) => item.id !== contactId);
      if (JSON.stringify(object) === JSON.stringify(newData)) {
        return "id no existe";
      } else {
        fs.writeFile(contactsPath, JSON.stringify(newData));
        return "se elimino un registro";
      }
    })
    .catch((err) => console.log(err.message));
};

const addContact = async (body) => {
  return fs
    .readFile(contactsPath)
    .then((data) => {
      const newData = JSON.parse(data);
      const newContact = {
        id: crypto.randomBytes(8).toString("hex"),
        name: body.name,
        email: body.email,
        phone: body.phone,
      };
      newData.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(newData));
      return newContact;
    })
    .catch((err) => console.log(err.message));
};

const updateContact = async (contactId, body) => {
  return fs
    .readFile(contactsPath)
    .then((data) => {
      const newData = JSON.parse(data);
      let index = 0;
      newData.forEach((contact) => {
        if (contact.id === contactId) {
          index = 1;
          contact.name = body.name;
          contact.email = body.email;
          contact.phone = body.phone;
        }
      });
      fs.writeFile(contactsPath, JSON.stringify(newData));
      return index;
    })
    .catch((err) => console.log(err.message));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
