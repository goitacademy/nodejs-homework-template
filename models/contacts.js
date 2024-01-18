import fs from "fs";
import path from "path";
import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const contactsPath = path.resolve(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.promises.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactToRemove = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await fs.promises.writeFile(
      contactsPath,
      JSON.stringify(contactToRemove, null, 2)
    );

    return true;
  } catch (e) {
    console.log(e);
  }
}
async function addContact(name, phone, email) {
  try {
    const newContact = { name, phone, email };
    const contacts = await listContacts();
    const updatedContacts = [...contacts, newContact];

    await fs.promises.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2)
    );

    return newContact;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function updateContact(contactId, body) {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex !== -1) {
      const updatedContact = { ...contacts[contactIndex], ...body };
      contacts[contactIndex] = updatedContact;

      fs.promises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

      return updatedContact;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
