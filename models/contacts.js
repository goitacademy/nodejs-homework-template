




// const updateContact = async (contactId, body) => {}



const fs = require("fs/promises");
const path = require('path');
const {nanoid} = require("nanoid");


const contactsPath = path.join(__dirname, "contacts.json");
const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null , 2))



const listContacts = async () => {
   const data = await fs.readFile(contactsPath);
   return JSON.parse(data);
  }
  
 const getContactById = async(contactId) => {
   const contacts = await listContacts()
   const oneContact =  contacts.find( contact => contact.id === contactId)
   return oneContact || null
  }


  const updateContact = async (id, {name, email, phone}) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1) {
        return null;
    }
    contacts[index] = {id, name, email, phone};
    await updateContacts(contacts);
    return contacts[index];
}
  
  const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id ===  contactId);
    if(index === -1){
        return null
    }
   const [result] =  contacts.splice(index,1);
   await updateContacts(contacts)
   return result
  }
  
  const addContact = async({name, email, phone}) => {
    const contacts = await listContacts();
    const newContact = {
        id:nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact);
    await updateContacts(contacts)
    return newContact

  }
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  }