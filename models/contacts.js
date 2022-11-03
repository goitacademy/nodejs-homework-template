import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./models/contacts.json");

async function readContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function writeContacts(newContacts) {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
}

export const listContacts = async () => {
  try {
    const contacts = await readContacts();
    return contacts;
  } catch (err) {
    return err.message;
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const chosenContacts = contacts.find(({ id }) => contactId === id);
    if (chosenContacts) {
      return chosenContacts;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(({ id }) => contactId !== id);
    if (filteredContacts.length === contacts.length) {
      return false;
    }
    await writeContacts(filteredContacts);
    return true;
  } catch (err) {
    return err.message;
  }
};

export const addContact = async ({ email, name, phone }) => {
  try {
    console.log('in add start')
    const contacts = await listContacts();
    const isSameContact = contacts.some(
      ({ email: oldEmail }) => oldEmail === email
    );
    if (!isSameContact) {
      const contactToAdd = {
        id: nanoid(),
        name,
        email,
        phone,
      };
      const newContacts = [...contacts, contactToAdd];
      await writeContacts(newContacts);
      return contactToAdd;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};

export const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index !== -1) {
      contacts[index] = { id: contactId, ...body };
      await writeContacts(contacts);
      return contacts[index];
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};
