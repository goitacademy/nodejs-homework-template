
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";


const contactsPath = path.join('models', 'contacts.json');


const updateContact = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error("Error writing contacts:", error);
  }
};

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(result);
  } catch (error) {
    console.error("Error reading contacts:", error);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
  } catch (error) {
    console.error("Error finding contact by ID:", error);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContact(contacts);
    return result;
  } catch (error) {
    console.error("Error removing contact:", error);
    return null;
  }
}

async function addContact({name, email, phone}) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
}

const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
      return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await updateContact(contacts);
  return contacts[index];
}

export  {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactById
}
