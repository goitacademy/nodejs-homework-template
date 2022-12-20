// const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }

const fs  = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname,  "contacts.json");

async function listContacts() {
const list = await fs.readFile(contactsPath, "utf8");
return JSON.parse(list);
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if(index === -1){
      return null
    }
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  }
  
  async function addContact(data) {
    const contacts = await listContacts();
    // const newContact= {
    //   id: nanoid(),
    //   name,
    //   email, 
    //   phone,
    // }
    const newContact={id: nanoid(),...data}
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact;
  }

  async function updateById(id, data) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    contacts[idx] = {id,...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts[idx];
}


  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateById
  }