const fs = require('fs/promises');
const { dirname } = require('path');

const path = require('path');
const  uniqid = require('uniqid'); 
const contactsPath = path.join(__dirname, "./contacts.json")

const listContacts = async () => {
  const list = await fs.readFile(contactsPath);
    const contacts = JSON.parse(list);
    return contacts;
}

const getContactById = async (contactId) => {
  const list = await fs.readFile(contactsPath);
    const contacts = JSON.parse(list);
    const result = contacts.find(contact => contact.id === contactId);
    if (!result) { return null };
    return result;
}

const removeContact = async (contactId) => {
  const list = await fs.readFile(contactsPath);
    const contacts = JSON.parse(list);
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null
    }
    const delataContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath,JSON.stringify(contacts) );
    return delataContact[0] ;
}

const addContact = async ({name, email, phone}) => {
  const list = await fs.readFile(contactsPath);
    const contacts = JSON.parse(list);
    const newContact = { name, email, phone, id: uniqid() }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;

}

const updateContact = async (contactId, body) => {
  const list = await fs.readFile(contactsPath);
  const contacts = JSON.parse(list);
  const indexContact = contacts.findIndex(contact => contact.id === contactId);
  if (indexContact === -1) {
        return null
  }
  contacts[indexContact] = { ...contacts[indexContact], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[indexContact];

}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
