const fs = require("fs/promises");
const path = require("path");

const contactPath = path.join(__dirname, "contacts.json");

const rewriteListContacts = async (contacts) => {
  await fs.writeFile(contactPath, JSON.stringify(contacts), "utf8");
};

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = {
  listContacts,
  rewriteListContacts,
};
