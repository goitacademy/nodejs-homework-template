const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');
const contactsPath = path.resolve('./models/contacts.json');



const listContacts = async () => {

  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  // console.log(contacts)
  return contacts;
}

const get = async (contactId) => {
  
  const contacts = await listContacts();
  // console.log(contacts[4].id)
  const result = contacts.find(contact => contact.id === contactId);
  //  console.log(result)
  if(!result) {
      return null
    }
  // console.log(result)
  return result;

}

const removeContact = async (contactId) => { 
  const contacts = await listContacts();
  // console.log(contactId)
  const idx = contacts.findIndex(contact => contact.id === String(contactId));
  // console.log(contactId)
  if(idx === -1) {
      return null
  }
  const [remove] = contacts.splice(idx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return remove
}

const addContact = async (body) => {
  // console.log(body)
  const {name, email, phone} = body
  const contacts = await listContacts();
  const newContacts = {
    id: v4(), name, email, phone
  };
  // console.log(result)
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  // console.log(contacts)
  return newContacts;
 }

const updateContact = async (contactId, body) => {
  console.log(contactId)
  const { name, email, phone} = body
  const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === String(contactId));
    if(idx === -1) {
        return null
    }
  contacts[idx] = {...{id: `${contactId}`, name, email, phone}}
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idx];
 }

module.exports = {
  listContacts,
  get,
  removeContact,
  addContact,
  updateContact,
}
