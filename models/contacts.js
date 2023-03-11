const fs = require("fs").promises;
const shortid = require("shortid");

try {
  async function updateListContacts(newContent) {
    return await fs.writeFile(
      "./models/contacts.json",
      JSON.stringify(newContent),
      "utf8"
    );
  }

  async function readContactsFile() {
    return await fs.readFile("./models/contacts.json", "utf8");
  }

  async function listContacts() {
    const contacts = await readContactsFile().then(JSON.parse);
    return contacts;
  }

  async function getById(id) {
    const contacts = await readContactsFile().then(JSON.parse);
    const contact = contacts.find((item) => item.id === id);
    return contact;
  }

  async function removeContact(id) {
    const contacts = await readContactsFile().then(JSON.parse);
    const idx = contacts.findIndex((item) => item.id === id);
    if (idx === -1) {
      return null;
    }
    const deletedContact = contacts.splice(idx, 1);
    await updateListContacts(contacts);
    return deletedContact;
  }

  async function addContact({ name, email, phone }) {
    const contacts = await readContactsFile().then(JSON.parse);
    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };
    updateListContacts([...contacts, newContact]);
    return newContact;
  }

  async function updateContact(id, data) {
    const contacts = await readContactsFile().then(JSON.parse);
    const idx = contacts.findIndex((item) => item.id === id);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { id, ...data };
    await updateListContacts(contacts);
    return contacts[idx];
  }

  module.exports = {
    listContacts,
    getById,
    removeContact,
    addContact,
    updateContact,
  };
} catch (error) {
  console.error(error);
}
