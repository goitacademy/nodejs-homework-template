import fs from "fs/promises";
import path from "path";
import { nanoid } from 'nanoid';

const contactsPath = path.resolve("models", "contacts.json");


export async function listContacts() {
    try {
        const result = JSON.parse(await fs.readFile(contactsPath));
        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function getContactsById(contactId) {
    try { 
        const contactList = await listContacts();
        const index = contactList.findIndex(contact => contact.id === contactId);
        if (index === -1) {
            return null;
        }
        return contactList[index];
    } catch (e) {
        console.error(e);
    }
}

export async function removeContactById(contactId) {
    try {
        const contactList = await listContacts();
        const index = contactList.findIndex(contact => contact.id === contactId);
        if (index === -1) {
            return null;
        }
        const [deleteContact] = contactList.splice(index, 1);
        fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
        return deleteContact;

    }
    catch (e) {
        console.log(e);
    }
}

export async function addContact(name, email, phone) {
    try {
        const contactList = await listContacts();
        const newContact = { id: nanoid(), name, email, phone };
        contactList.push(newContact);
        fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
        return newContact;
    }
    catch (e) {
        console.log(e);
    }
     
}

export async function updateContact(id, data) {
    try {
      const contactList = await listContacts();
        const index = contactList.findIndex(contact => contact.id === id);
        if (index === -1) {
            return null;
        }
        contactList[index] = {...contactList[index], ...data}
        fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
        return contactList[index];
    }
    catch (e) {
        console.log(e);
    }
     
}



