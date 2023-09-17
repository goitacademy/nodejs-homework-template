import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';
const contactsPath = path.resolve('models','contacts.json');


const listContacts = async () => {
        const data = await fs.readFile(contactsPath, 'utf8');
        return JSON.parse(data);
};

const getContactById = async (id) => {
        const contacts = await listContacts();
        const contact = contacts.find(contact => contact.id === id);
        return contact || null;
};

const removeContact = async (id) => {
        const contacts = await listContacts();
        const index = contacts.findIndex(contact => contact.id === id);
        if(index === -1) return null;

        const [result] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        return result;
};

const addContact = async body => {
        const { name, email, phone } = body;
        const contacts = await listContacts();
        const newContact = { id: nanoid(), name, email, phone };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact || null;
};

const updateContact = async (id, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
  
    if (index === -1) return null;
    contacts[index] = {id: id, ...body };
  
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}