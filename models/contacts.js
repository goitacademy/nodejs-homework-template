const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
    try {
        const contactsDb = await fs.readFile(contactsPath, 'utf8');
        return JSON.parse(contactsDb);
    }
    catch (error) {
        console.error(error);
    }
}

const getContactById = async (contactId) => {
    try {
        const contactsDb = await fs.readFile(contactsPath, 'utf8');
        const [ contact ] = JSON.parse(contactsDb).filter((item) => item.id === contactId);
        return contact;
    }
    catch (error) {
        console.error(error);
    }
}

const addContact = async (body) => {
    try {
        const { name, email, phone } = body;
        const contactsDb = await fs.readFile(contactsPath, 'utf8');
        const newContact = {
            id: Date.now().toString(),
            name,
            email,
            phone
        };
        const contacts = JSON.parse(contactsDb);
        for (const contact of contacts) {
            if (contact.email === email) {
                return email;
            }
        }
        await fs.writeFile(contactsPath, JSON.stringify([...JSON.parse(contactsDb), newContact], null, 2), 'utf8');
        return newContact;
    }
    catch (error) {
        console.error(error);
    }
}

const removeContact = async (contactId) => {
    try {
        const contactsDb = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(contactsDb);
        const [ result ] = contacts.filter(contact => contact.id === contactId);
        if (result) {
            await fs.writeFile(contactsPath, JSON.stringify(contacts.filter(contact => contact.id !== contactId), null, 2), 'utf8');
            return result;
        } else {
            return 404;
        }
    }
    catch (error) {
        console.error(error);
    }
}

const updateContact = async (contactId, body) => {
    try {
        const { name, email, phone } = body;
        const updateContact = {
            id: contactId,
            name,
            email,
            phone
        };
        const contactsDb = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(contactsDb);
        const [ result ] = contacts.filter(contact => contact.id === contactId);
        if (result) {
            await fs.writeFile(contactsPath, JSON.stringify([...contacts.filter(contact => contact.id !== contactId), updateContact], null, 2), 'utf8');
            return updateContact;
        } else {
            return 404;
        }
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
}
