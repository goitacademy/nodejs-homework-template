const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, '../models/contacts.json');

const getAll = async () => {
    try{
        const data = await fs.readFile(contactsPath, 'utf-8');
        const allContacts = JSON.parse(data);
        return allContacts;
    } catch (error){
        console.log(error.message)
    };
};

const getContactById = async (id) => {
    try{
        const contact = await getAll();
        const contactById = contact.find(item => item.id === id);
        return contactById || null;
    } catch (error){
        console.log(error.message);
    };
};
  
const addContact = async (contact) => {
    const contacts = await getAll();
    const newContact = {
        id: nanoid(),
        ...contact,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;

};

const updateContact = async (id, data) => {
    const contacts = await getAll();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    contacts[index] = {id, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
};

const removeContact = async (id) => {
    const contacts = await getAll();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
};


module.exports = {
    getAll,
    getContactById,
    addContact,
    updateContact,
    removeContact,
};