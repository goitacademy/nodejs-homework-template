const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { readFile, writeFile } = require('fs').promises;


const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
    try {
        const contacts = await readFile(contactsPath);
        return JSON.parse(contacts);
    } catch (error) {
        console.log(error);
    }
};

const getContactById = async (contactId) => {
    try {
        const data = await listContacts();
        const contactById = data.find((contact) => contact.id === contactId);
        return contactById || null;        
    } catch (error) {
        console.log(error);
    }
}

const removeContact = async (contactId) => {
    try {
        const data = await listContacts();
        const index = data.findIndex(contact => contact.id === contactId);
        if (index === -1) {
            return null;
        }

        const [result] = data.splice(index, 1)
        await writeFile(contactsPath, JSON.stringify(data, null, 2));
        return result;      
    } catch (error) {
        console.log(error);
    }  
}

const addContact = async (name, email, phone) => {
    try {
        const data = await listContacts();
        const newContact = {
            id: uuidv4(),
            name,
            email,
            phone
        };
        data.push(newContact);
        await writeFile(contactsPath, JSON.stringify(data, null, 2));
        return newContact;
    } catch (error) {
        console.log(error);
    }  
}

const updateContact = async (contactId, body) => {
    try {
        const data = await listContacts();
        const index = data.findIndex(contact => contact.id === contactId);
        if (index === -1) {
            return null;
        }

        data[index] = { contactId, ...body }
        writeFile(contactsPath, JSON.stringify(data, null, 2))
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
}
