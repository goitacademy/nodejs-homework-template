const shortid = require('shortid');
const fs = require("fs").promises;
const path = require("node:path");

const contactsPath = path.join(__dirname, "db/contacts.json");

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
    const result = contacts.filter((_,index)=>index!==idx);
    await fs.writeFile(contactsPath,JSON.stringify(result));
    return contacts[idx]  
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {id:shortid .generate(), name, email, phone }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact
}

module.exports = { listContacts, getContactById, removeContact, addContact, };
