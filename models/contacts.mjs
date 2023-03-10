import fs from "fs-extra";
import path from "path";

const { readJSON, writeJSON } = fs;

const contactsPath = path.resolve("./models/contacts.json");

function handleError(error) {
console.error(error);
return;
}

export const listContacts = async () => {
try {
const contacts = await readJSON(contactsPath);
return contacts;
} catch (error) {
handleError(error.message);
return [];
}
};

export const getContactById = async (id) => {
try {
const contacts = await listContacts();
const contact = contacts.find(({ id: contactId }) => contactId === id);
if (!contact) throw new Error(`Contact with id ${id} not found`);
return contact;
} catch (error) {
const errorMessage = error.message;
handleError(`Error in getById: ${errorMessage}`);
throw error;
}
};

export const addContact = async ({ name, email, phone }) => {
try {
const contacts = await listContacts();
if (!name || !email || !phone) {
throw new Error("Missing required fields");
}
const newContact = { id: Date.now().toString(), name, email, phone };
const updatedContacts = [...contacts, newContact];
await writeJSON(contactsPath, updatedContacts);
return newContact;
} catch (error) {
const errorMessage = `Error in addContact: ${error.message}` ;
handleError(errorMessage);
throw error;
}
};

export const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === id);
    if (!contact) {
      throw new Error("Contact not found");
    }
    const updatedContacts = contacts.filter((item) => item.id !== id);
    await writeJSON(contactsPath, updatedContacts);
    return { message: "Contact deleted" };
  } catch (error) {
    const errorMessage = `Error in removeContact: ${error.message}`;
    handleError(errorMessage);
    throw error;
  }
};

export const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((item) => item.id === id);
  if (contactIndex === -1) {
    throw new Error("Contact not found");
  }
  const updatedContact = { ...contacts[contactIndex], ...body };
  contacts.splice(contactIndex, 1, updatedContact);
  try {
    await writeJSON(contactsPath, contacts, { spaces: 2 });
    return updatedContact;
  } catch (error) {
    const errorMessage = `Error in updateContact: ${error.message}`;
    handleError(errorMessage);
    throw error;
  }
};