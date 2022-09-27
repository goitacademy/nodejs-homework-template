const fs = require('fs/promises')
const path=require('path')
const {nanoid}=require('nanoid')

const contactsPath=path.join(__dirname,'/contacts.json')

const listContacts = async () => {
  const result=await fs.readFile(contactsPath,'utf-8')
  return JSON.parse(result)
}

const getContactById = async (contactId) => {
  const data= await listContacts()
  const result = await data.find(contact=>contact.id===contactId)
  return result || null
}

const removeContact = async (contactId) => {
  const data=await listContacts()
  const index= data.findIndex(contact=>contact.id===contactId)
  if(index===-1){
    return null}
    const [result]= data.splice(index,1)
    await fs.writeFile(contactsPath,JSON.stringify(data,null,2))
    return result
}

const addContact = async (body) => {
  const data=await listContacts()
  const{name,email,phone}=body
  const newContact={
    id:nanoid(),
    name,
    email,
    phone,
  }
  data.push(newContact)
  await fs.writeFile(contactsPath,JSON.stringify(data,null,2))
  return newContact
}

const updateContact = async (contactId, body) => {
const data= await listContacts();
const result=data.find(contact=>contact.id===contactId)
if(!result){
  return null
}
const {name,email,phone}=body;
const updatedItem={
  id:nanoid(),
  name,
  email,
  phone,
}
data.push(updatedItem)
await fs.writeFile(contactsPath,JSON.stringify(data,null,2))
return updatedItem
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
