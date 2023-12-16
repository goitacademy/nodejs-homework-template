import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

 const contactsPath = path.resolve("models", "contacts.json");

export const listContacts = async () => {const data = await fs.readFile(contactsPath);
    return JSON.parse(data);}

export const getContactById = async (id) => {const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;}

export const removeContact = async (id) => {const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1) {
    return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;}

export const addContact = async (body) => {const contacts = await listContacts();  
    const newContact = {
        id: nanoid(),
        ...body
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;}

export const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { ...contacts[index], ...body };
    await updateMovies(contacts);
    return contacts[index];
}


