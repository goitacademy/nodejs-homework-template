const fs = require("fs/promises");
const path = require("path");

const contactPath = path.resolve("./models/contacts.json");

async function getDb() {
  const dbRaw = await fs.readFile(contactPath);
  const db = JSON.parse(dbRaw);
  return db;
}

const listContacts = async () => {
  try {
    const contacts = await getDb();
    return contacts;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getDb();
    const contact = contacts.filter((cont) => cont.id === String(contactId));
    return contact[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await getDb();
    const contact = contacts.find((cont) => cont.id === contactId);
    if (!contact) {
      return null;
    }
    const newContacts = contacts.filter((cont) => cont.id !== contactId);
    await fs.writeFile(contactPath, JSON.stringify(newContacts), "utf8");
    return contact;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await getDb();
    const newContacts = [body, ...contacts];
    const newContactsRaw = JSON.stringify(newContacts);
    await fs.writeFile(contactPath, newContactsRaw, "utf8");
    return body;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await getDb();
    const [contact] = contacts.filter((cont) => cont.id === String(contactId));

    if (!contact) {
      return null;
    }

    const { name, email, phone } = body;

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;

    await fs.writeFile(contactPath, JSON.stringify(contacts), "utf8");

    return contact;
  } catch (error) {}
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
