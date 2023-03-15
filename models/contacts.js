const { v4: uuidv4 } = require('uuid');

const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve("models", "contacts.json");

async function listContacts() {
    try{
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    }catch(error){
        console.log(error.message);
    }
}

async function getContactById(contactId) {
    const contacts = await listContacts();

    const filterContact = contacts.filter((contact) => contact.id === contactId);
    return filterContact;
}

async function removeContact(contactId) {
    try{
        const contacts = await listContacts();
        const contactFilter = contacts.filter((contact) => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(contactFilter, null, 4));
    }catch(error){
        console.log(error.message);
    }
}

async function addContact({name, email, phone}) {
    try{
        const newContacts = {id: uuidv4(), name, email, phone};
        const contacts = await listContacts();
        const addNewContact = [...contacts, newContacts];

        await fs.writeFile(contactsPath, JSON.stringify(addNewContact));
        return newContacts;
    }catch(error){
        console.log(error.message);
    }
    
}


async function updateContact(contactId, {name, email, phone}){
    try{
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    
    if (name) contact.name = name;
    if (email) contact.email = email;
    if (phone) contact.phone = phone;

    const contactIdx = contacts.findIndex((item) => item.id === contactId);

    contacts[contactIdx] = contact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
}catch(error){
    console.log(error.message);
}
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}
