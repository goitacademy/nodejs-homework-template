const fs = require("fs").promises;
const nanoid = import("nanoid");
const format = require("path").format;

const contactsPath = format({
  root: "/",
  dir: "db",
  base: "contacts.json",
});

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
  } catch (message) {
    return console.log(message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();

    const contact = data.filter(({ id }) => id === contactId)[0];

    return contact || null;
  } catch (message) {
    console.log(message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const contact = await getContactById(contactId);

    if (contact) {
      const newContacts = data.filter(({ id }) => id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
    }

    return contact || null;
  } catch (e) {
    console.log(e.message);
  }
}

async function addContact({ name, email, phone }) {
  try {
    if (!(name && email && phone)) return null;

    const id = (await nanoid).nanoid();

    const newContact = {
      id: id,
      name,
      email,
      phone,
    };

    const contacts = await listContacts();
    const contact = await getContactById(newContact.id);

    if (contact) return null;

    const newContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");

    return newContact;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function updateContact(id, updatedContactObj) {
  try {
    if (Object.keys(updatedContactObj).length === 0) return null;

    let updatedContact = {};

    const contacts = await listContacts();
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === id) {
        updatedContact = { ...contact, ...updatedContactObj };
        return updatedContact;
      }

      return contact;
    });

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf-8");

    return updatedContact;
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
