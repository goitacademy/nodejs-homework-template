const fs = require("fs").promises;
const { table } = require("console");
const path = require("path");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contList = JSON.parse(contacts);
    return contList;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contList = JSON.parse(contacts);
    const contId = contList.find(
      (cont) => Number(cont.id) === Number(contactId)
    );

    if (contId.length !== 0) {
      return contId;
    } else {
      console.log("ID not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
