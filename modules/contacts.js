const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

shortid.seed(1000);

const contactsPath = path.win32.format({
  dir: "db",
  base: "contacts.json",
});

async function listContacts() {
  try {
    const json = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(json);
    return contacts;
  } catch (error) {
    return error;
  }
}

const getContactById = async (contactId) => {
  try {
    const json = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(json);
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    return error;
  }
};

const removeContact = async (contactId) => {
  try {
    const json = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(json);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index >= 0) {
      const removedContact = contacts[index];
      contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return removedContact;
    }
  } catch (error) {
    return error;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    let existingContact = false;
    const json = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(json);
    if (contacts.find((contact) => contact.email === email)) {
      existingContact = true;
    }

    if (!existingContact) {
      const id = shortid.generate();
      const contact = { id, name, email, phone };
      contacts.push(contact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return contact;
    }
  } catch (error) {
    return error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const json = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(json);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index >= 0) {
      contacts[index] = { ...contacts[index], ...body };
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return contacts[index];
    } else return false;
  } catch (error) {}
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
