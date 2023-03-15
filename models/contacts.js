
const fs = require('fs/promises')
const path = require("path");
const contactsPath = path.resolve("models", "contacts.json")

const listContacts = async () => {
 const list = await fs.readFile(contactsPath, 'utf-8')

 return JSON.parse(list)
}

const getContactById = async (contactId) => {
  const list = await fs.readFile(contactsPath, 'utf-8')
  const findContactId = JSON.parse(list).find(contact => contact.id.toString() === contactId)
  console.log(findContactId)
  return findContactId
  
}

const removeContact = async (contactId) => {
  const list = await fs.readFile(contactsPath, 'utf-8')
  const deleteContact = JSON.parse(list).filter(contact => contact.id.toString() !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(deleteContact))
  return deleteContact
}

const addContact = async (name, email, phone) => {
  const list = await fs.readFile(contactsPath, 'utf-8')
  const addContact = [...JSON.parse(list), {id:name, email, phone,name}]
await fs.writeFile(contactsPath, JSON.stringify(addContact))
return addContact}


const updateContact = async (contactId, body) => {
  const list = JSON.parse(await fs.readFile(contactsPath, 'utf-8'))
  const index = list.findIndex(obj => obj.id.toString()===contactId);
  if(index === -1){
    return null
  }
  list[index]={...list[index], ...body}
  await fs.writeFile(contactsPath, JSON.stringify(list))
return list
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
