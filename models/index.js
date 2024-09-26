import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContact = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const getAllContacts = async()=> {
    const buffer = await fs.readFile(contactsPath);
    return JSON.parse(buffer);
}

export const getContactById = async id => {
    const contacts = await getAllContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
}

export const addContact = async({name, email, phone}) => {
    const contacts = await getAllContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;
}

export const updateContactById = async(id, {name, email, phone}) => {
    const contacts = await getAllContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1) {
        return null;
    }
    contacts[index] = {id, name, email, phone};
    await updateContact(contacts);
    return contacts[index];
}

export const deleteContactById = async id => {
    const contacts = await getAllContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1) {
        return null;
    }
    
    const [result] = contacts.splice(index, 1);
    await updateContact(contacts);
    return result;
}