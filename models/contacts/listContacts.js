const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "../../db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const products = JSON.parse(data);
  return products;
}

module.exports = {
  listContacts,
};
