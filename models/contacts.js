const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function readContacts() {
  try {
    const dbRaw = await fs.readFile(contactsPath);
    return JSON.parse(dbRaw);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function writeContacts(db) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const db = await readContacts();
  const contact = db.filter((contact) => contact.id === contactId);
  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const db = await readContacts();
  db.push(contact);
  await writeContacts(db);
  return contact;
};

const removeContact = async (contactId) => {
  const db = await readContacts();
  const updatedDb = db.filter((contact) => contact.id !== contactId);
  await writeContacts(updatedDb);
};

const updateContact = async (contactId, body) => {
  const db = await readContacts();
  const { name, email, phone } = body;

  db.forEach((contact) => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });

  await writeContacts(db);
  return await getContactById(contactId);
};

module.exports = {
  readContacts,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
