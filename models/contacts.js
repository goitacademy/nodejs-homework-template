const fs = require('fs/promises')
const path = require('path')
const Joi = require('joi')

const contactsFilePath = path.join(__dirname, 'contacts.json') 


const listContacts = async () => {
  const data = await fs.readFile(contactsFilePath, 'utf-8')
  
    return JSON.parse(data)}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find((contact) => contact.id === contactId)
  
  if (!contact) {
      
    throw new Error('Contact not found')
  } else {
  
    return contact
  }
}

const removeContact = async (contactId) => {
  const contacts = await getContactsList()
  const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
  )
  
    await fs.writeFile(contactsFilePath, JSON.stringify(updatedContacts))
}


const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
