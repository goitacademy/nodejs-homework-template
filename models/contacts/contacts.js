const fs = require('fs/promises')
const {nanoid}=require('nanoid')
const path=require('path');
const contactsPath=path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const allContacts=await fs.readFile(contactsPath)
  return JSON.parse(allContacts)
}

const getContactById = async (id) => {
  const allContacts=await listContacts();
  const index=allContacts.findIndex(contact=>contact.id===id)
  if(index===-1){
    return null
  }
  return allContacts[index]
}

const removeContact = async (contactId) => {
  const allContacts=await listContacts();
  const index=allContacts.findIndex(contact=>contact.id===contactId)
  if(index===-1){
    return null
  }
  const [deletedContact]=allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2))
  return deletedContact
}

const addContact = async (body) => {
const allContacts=await listContacts();
const newContact={id:nanoid(), ...body}
allContacts.push(newContact)
await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2))
return newContact
}

const updateContact = async (id, body) => {
  const allContacts=await listContacts();
  const index=allContacts.findIndex(contact=>contact.id===id)
  if(index===-1){
    return null
  }
  allContacts[index]={id, ...body}
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2))
  return allContacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
