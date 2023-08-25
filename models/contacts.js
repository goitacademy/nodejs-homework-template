import path from "path";
import { readFile, writeFile } from "fs/promises";
import nanoid from "nanoid";

const contactsPath = path.join("models", "contacts.json");

export const listContacts = async () => {
  try {
    const data = await readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error("Error while reading contacts");
    throw err;
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      return false;
    }

    return contact;
  } catch (err) {
    console.error("Error while reading contacts by id");
    throw err;
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id == contactId
    );
    if (contactIndex === -1) {
      return false;
    }
    contacts.splice(contactIndex, 1);
    await writeFile(contactsPath, JSON.stringify(contacts));

    return true;
  } catch (err) {
    console.error("Error while deleting contacts by id:", err);
    throw err;
  }
};

export const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const { email, phone, name } = body;
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (err) {
    console.error("Error while adding contacts");
    throw err;
  }
};
export const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id == contactId
    );

    if (contactIndex === -1) {
      return false;
    }

    const updatedContact = { ...contacts[contactIndex], ...body };
    contacts[contactIndex] = updatedContact;

    await writeFile(contactsPath, JSON.stringify(contacts));
    return updatedContact;
  } catch (err) {
    console.error("Error while updating contacts:", err);
    throw err;
  }
};
