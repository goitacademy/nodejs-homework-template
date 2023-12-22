import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";


const contactsPath = path.resolve('models', 'contacts', 'contacts.json');
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts));


const listContacts = async () => {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
};

const getContactById = async (id) => {
    const contacts = await listContacts();
    const searchedContact = contacts.find(contact => contact.id === id);

    return searchedContact || null;
};

const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };

    contacts.push(newContact);
    await updateContacts(contacts);

    return newContact;
};

const updateContact = async (id, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);

    if (index === -1) {
        return null;
    }

    contacts[index] = { ...contacts[index], ...data };
    await updateContacts(contacts);

    return contacts[index];
}

const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contactIdx => contactIdx.id === id);
    if (index === -1) {
        return null;
    };
    const [deletedContact] = contacts.splice(index, 1);
    await updateContacts(contacts);

    return deletedContact;
};


export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    removeContact,
};