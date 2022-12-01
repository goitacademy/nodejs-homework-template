const fs = require('fs/promises');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
};

const getContactById = async (contactId) => {
        const contacts = await listContacts();
        const contact = contacts.find((contact) =>
        contact.id === contactId.toString());
        return contact;
};

const removeContact = async (contactId) => {
        const contacts = await listContacts();
        const contactIndex = contacts.findIndex((contact) =>
        contact.id === contactId.toString());
        if (contactIndex === -1) {
        return null;
}

        const newContactList = contacts.filter((contact) =>
                contact.id !== contactId.toString());
        await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 4));
        return contacts[contactIndex];
};

const addContact = async (body) => {
        const {name, email, phone} = body;
        const contactList = await listContacts();
        const newContact = {
                id: uuidv4(),
                name,
                email,
                phone,
        };
        contactList.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 4));
        return newContact;
};

const updateContact = async (contactId, body) => {

        const contacts = await listContacts();                   
        const contactIndex = contacts.findIndex((contact) => 
        contact.id === contactId.toString());

        if (contactIndex === -1) {                              
        return null;
        };
        
        const updatedContact = { ...contacts[contactIndex], ...body };
        
        contacts[contactIndex] = updatedContact;

        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4)); 
        return updatedContact;
};

module.exports = {
        listContacts,
        getContactById,
        removeContact,
        addContact,
        updateContact,
};
