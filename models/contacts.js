const shortid = require('shortid');
const fs = require("fs").promises;
const path = require("node:path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "UTF8");
  const contacts = JSON.parse(data);

  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item=>item.id===contactId);
    if(!idx){
        return null;
    }
    const result = contacts.splice(idx,1);
    await fs.writeFile(contactsPath,JSON.stringify(result));
    return contacts[idx]  
}

const addContact = async(data) => {
    const contacts = await listContacts();
    const newContact = {
        id: shortid.generate(),
        ...data,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const updateById = async (id, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    contacts[index] = {...contacts[index], ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = { listContacts, getContactById, removeContact, addContact,updateById };
