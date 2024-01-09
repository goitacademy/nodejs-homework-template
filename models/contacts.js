const fs = require('fs/promises');
const {nanoid} = require('../node_modules/nanoid');

const contactsPath = './models/contacts.json';


const listContacts = async () => {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
}

const getContactById = async(contactId)=> {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
}

const removeContact = async(contactId)=> {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    };
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

const addContact = async (body)=> {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...body,
    };
    const isExistingContact = ({ name }) => contacts.some(contact => contact.name === name); 
    if (isExistingContact(newContact)) {
        console.log(`contact with name ${newContact.name} already existing`);
        return newContact;
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = { id:contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}


