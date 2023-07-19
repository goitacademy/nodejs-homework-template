// const { v4: uuidv4 } = require('uuid');
const fs = require("fs").promises;
const path = require("node:path");

const listContacts = async () => {
  const contactsPath = path.format({
    root: "C:UsersUserDocumentsGitHubGRUPA-11-GOITgoit-node-hw-01",
    dir: "db",
    base: "contacts.json"
  });
  fs.readFile(contactsPath)
    .then((data) => {
        console.log(data.toString())
        return data;
    })
    .catch((error) => {
      console.log("error:");
      console.log(error.message);
    });
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
