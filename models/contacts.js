const fs = require('fs/promises')
const path = require('path')
const shortid = require('shortid');

const contactsPath = path.format({
   dir: '.\\models',
   base: 'contacts.json'
 });

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath)
    return JSON.parse(result)
  } catch (error) {
    return error.message
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const result = contacts.find(item => item.id === contactId.toString())
    return result || null

  } catch (error) {
    return error.message
  }
}

const removeContact = async (contactId) => {
    try {
      const contacts = await listContacts()
      const contact = contacts.findIndex(item => item.id === contactId.toString())
      if(contact === -1){
        return null
      }
      const result = contacts.splice(contact, 1)
      await fs.writeFile(contactsPath, JSON.stringify(contacts))
      return result 
    } catch (error) {
      return error.message
    }
}

const addContact = async ({name, email, phone}) => {
  try {
    const contacts = await listContacts()
    const contact = {
      id: shortid(),
      name,
      email,
      phone,
    }
    contacts.push(contact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contact || null
  } catch (error) {
    return error.message
  }
}

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts()
    const data = contacts.findIndex(item => item.id === id.toString())
    if(data === -1){
      return null
    }
    contacts[data] = {id, ...body}
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts[data] 

  } catch (error) {
    return error.message
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
