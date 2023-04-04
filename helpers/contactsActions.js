const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "../models/contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const getAllContects = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = {
  updateContacts,
  getAllContects,
};
