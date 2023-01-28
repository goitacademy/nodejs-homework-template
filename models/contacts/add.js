const fs = require("fs/promises");
const contactDdbPath = require("./dbPath");
const get = require("./get");
const { v4: uuidv4 } = require("uuid");

async function add({ name, email, phone }) {
  const contacts = await get();

  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactDdbPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = add;
