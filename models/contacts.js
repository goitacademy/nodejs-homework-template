const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.find((contact) => contact.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const newData = data.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newData));
    const changedList = await listContacts();
    return changedList;
  } catch (error) {
    console.error(error);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const data = await listContacts();
    const newId = `${data.length + 1}`;
    data.push({
      id: newId,
      name: name,
      email: email,
      phone: phone,
    });
    await fs.writeFile(contactsPath, JSON.stringify(data));
    const newData = await listContacts();
    return newData;
  } catch (error) {
    console.error(error);
  }
}

async function updateContact(id, data) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === id);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { ...data, id };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idx];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
