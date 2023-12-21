import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = conmtacts => fs.writeFile(contactsPath, JSON.stringify(conmtacts, null, 2));

export const getAllContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

export const listContacts = async () => {
    const contacts = await getAllContacts();
    return contacts;
}

export const getContactById = async (id) => {
    const contacts = await getAllContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
}

export const removeContact = async (id) => {
    const contacts = await getAllContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

export const addContact = async (data) => {
    const contacts = await getAllContacts();
    const newContacts = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContacts);
    await updateContacts(contacts);
    return newContacts;
}

export const updateContact = async (id, data) => {
    const contacts = await getAllContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { ...contacts[index], ...data };
    await updateContacts(contacts);
    return contacts[index];
}