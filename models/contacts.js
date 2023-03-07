const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const [contact] = JSON.parse(data).filter((cont) => cont.id === contactId);
  if (contact) {
    return contact;
  }
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data).filter(
    (contact) => contact.id !== contactId
  );
  if (JSON.parse(data).length > contacts.length) {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    return contacts;
  }
};

const addContact = async (body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  body.id = crypto.randomUUID();
  const contacts = JSON.parse(data);
  contacts.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
  return contacts;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  contacts.forEach(async (contact) => {
    if (contact.id === contactId) {
      if (body.name) {
        contact.name = body.name;
      }
      if (body.email) {
        contact.email = body.email;
      }
      if (body.phone) {
        contact.phone = body.phone;
      }
      await fs.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2),
        "utf-8"
      );
      return contacts;
    }
  });
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
