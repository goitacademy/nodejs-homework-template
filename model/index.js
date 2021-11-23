const fs = require('fs/promises')
const path = require('path');
const contactsPath = path.resolve('./model/contacts.json')

async function listContacts(){
  const contacts = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contactList = await listContacts();
  const contactById = contactList.find(contact => contact.id === Number(contactId))
  return contactById;
}

async function removeContact(contactId){
  const contactList = await listContacts();
  const newContactList =  contactList.filter(contact => contact.id !== Number(contactId))
  const contactById = contactList.find(contact => contact.id === Number(contactId))
  await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2))  
  return contactById;
}

async function addContact ({name, email, phone}) {
    const contactList = await listContacts();
    const newContact = {id: new Date().getTime(), name, email,phone}
    contactList.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contactList, null), 'utf8');
    return newContact;
}




const updateContact = async (contactId, data) => {
      const contactList = await listContacts();
      const idx = contactList.findIndex(contact => contact.id === Number(contactId));
      if(idx === -1){
        return null;
      }
      contactList[idx] = {id: Number(contactId), ...data};    
      await fs.writeFile(contactsPath, JSON.stringify(contactList), 'utf8');
      return contactList[idx];
    }








module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
