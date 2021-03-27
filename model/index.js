const fs = require('fs/promises')
const path = require('path')
const contacts = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try{
    return JSON.parse(await fs.readFile(contacts, 'utf-8'))
  } catch{
      console.error(err.message)
      process.exit(1)
  }
}

const getContactById = async (contactId) => {
  try{
    const data = await listContacts()
    const userById = data.find(contact => String(contact.id) === contactId)
    return userById
  } catch(err){
      console.error(err.message)
      process.exit(1)
  }
}

const removeContact = async (contactId) => {
  try{
    const data = await listContacts()
    const index = data.findIndex(({id}) => String(id) === contactId)
    const delContact = data.filter(({id}) => String(id) !== contactId)
    await fs.writeFile(contacts, JSON.stringify(delContact))
    return index
  } catch(err){
    console.error(err.message)
    process.exit(1)
  }
}

const addContact = async (body) => {
  try{
    const user = await listContacts()
    const newUser = [...user, body]
    await fs.writeFile(contacts, JSON.stringify(newUser))
  } catch(err){
    console.error(err.message)
    process.exit(1)
  }
}

const updateContact = async (contactId, body) => {
  try{
    const data = await listContacts()
    const upContact = {id: contactId, ...body}
    const upContactList = data.map(contact => String(contact.id) === upContact.id ? {...upContact} : contact)
    const index = upContactList.findIndex(contact => String(contact.id) === contactId)
    await fs.writeFile(contacts, JSON.stringify(upContactList))    
    return upContactList[index]
  } catch(err){
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
