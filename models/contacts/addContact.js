const fs = require("fs/promises");
const shortid = require("shortid");

const listContacts = require("./listContacts");
const filePath = require("./filePath");

async function addContact(body) {
  const contacts = await listContacts();
  const newContact = {
    id: shortid.generate(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
}

module.exports = addContact;
