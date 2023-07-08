const fs = require('fs/promises');
const { join } = require('path');
const shortid = require('shortid');

const contactsPath = join(__dirname, 'contacts.json');


// destroys the array of contacts
const getListContact = async() => {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
}
// returns object by id
const getContactById = async(id) => {
    const contacts = await getListContact();
    const oneContact = contacts.find((contact) => contact.id === id);
    return oneContact || null;
}
// deletes and returns a contact by id
const removeContact = async(id) => {
    const contacts = await getListContact();
    const indexContact = contacts.findIndex((contact) => contact.id === id);
    if(indexContact === -1){
        return null;
    }
    const [contact] = contacts.splice(indexContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
    return contact;
}
// adds a contact to the array
const addContact = async(data) => {
    const contacts = await getListContact();
    const contact = {
        id: shortid.generate(),
        ...data
    }
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
    return contact;
}
const updateContact = async( id, body) => {
    const contacts = await getListContact();
    const indexContactById = contacts.findIndex((contact)=> contact.id === id);
    if(indexContactById === -1){
        return null;
    } 
    contacts[indexContactById] = { id, ...body};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
    return contacts[indexContactById];
}
module.exports = {
    getListContact,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}