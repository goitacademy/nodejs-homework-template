const fs = require('fs/promises')
const path=require("path")
const { nanoid } =require('nanoid') 

const contactsPath = path.resolve("./models", "contacts.json");



const listContacts = async () => {
  const data= await fs.readFile(contactsPath)
  const contacts = JSON.parse(data);
  return contacts
}

const getContactById = async (contactId) => {
  const contacts =await listContacts()
  const filteredContact=contacts.find(data=>{return data.id===contactId})
  return filteredContact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const filteredContact=contacts.filter(data=>{return data.id!==contactId})
  console.log(filteredContact);
  fs.writeFile(contactsPath,JSON.stringify(filteredContact))
}

const addContact = async (body) => {
  const data =await listContacts()
  const newUser={
    id:nanoid(),
    name:body.name,
    email:body.email,
    phone:body.phone,
  }
  data.push(newUser)
  
  fs.writeFile(contactsPath,JSON.stringify(data))
 
  return newUser
}

const updateContact = async (contactId, body) => {
  const contacts =await listContacts()
  const filteredContact=contacts.find(data=>{return data.id===contactId})
  filteredContact.name=body.name
  filteredContact.email=body.email
  filteredContact.phone=body.phone
  fs.writeFile(contactsPath,JSON.stringify(contacts))
  return filteredContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
