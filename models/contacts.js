const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./models/contacts.json");

// GET - Get all contacts

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
}

// GET / api / contacts /: id

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const findedContact = contacts.find((contact) => contact.id === contactId);
    return findedContact || null;
  } catch (error) {
    console.error(error.message);
  }
}

// POST / api / contacts

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContactName = contacts.find((contact) => contact.name === name);
    const newContactEmail = contacts.find((contact) => contact.email === email);
    const newContactPhone = contacts.find((contact) => contact.phone === phone);

    if (newContactName || newContactEmail || newContactPhone) {
      return console.log("The contact is already in the database!");
    }

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
}

// DELETE /api/contacts/:id

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const findedContactId = contacts.find(
      (contact) => contact.id === contactId
    );
    if (!findedContactId) {
      return;
    }
    const delContactId = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(delContactId, null, 2));
    return delContactId;
  } catch (error) {
    console.error(error.message);
  }
}

// PUT /api/contacts/:id

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
