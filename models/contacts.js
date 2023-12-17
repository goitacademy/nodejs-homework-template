
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const overwriteContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null
    }
    const [result] = contacts.splice(index, 1);
     await overwriteContacts(contacts);
    return result;
    
}

export async function addContact(body) {
  const contacts = await listContacts();
    const newContacts = {
        id: nanoid(),
       ...body,
    };
    contacts.push(newContacts);
    await overwriteContacts(contacts);
    return newContacts; 
}

export async function updateContact(contactId, body) {
  const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = { ...contacts[index], ...body, };
     await overwriteContacts(contacts);
    return contacts[index];
}