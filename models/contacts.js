const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const fileData = JSON.parse(data);
    console.table(fileData);
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const fileData = JSON.parse(data);

    fileData.map((contact) => {
      if (contactId === contact.id) {
        console.log(contact.name);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const fileData = JSON.parse(data);

    let index = fileData.map((el) => el.id).indexOf(contactId);

    fileData.splice(index, 1);
    console.table(fileData);
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async ({ name, email, phone } = body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const fileData = JSON.parse(data);

    const newContact = {
      id: `${fileData.length + 1}`,
      name,
      email,
      phone,
    };

    fileData.push(newContact);

    console.table(fileData);
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
