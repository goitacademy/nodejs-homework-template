const  {uuid}  = require('uuidv4');
const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath)
    return (JSON.parse(contactsList))
  } 
  catch (error){
    throw error;
  }

}

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts()
    const contactById = contactsList.find(contact => String(contact.id) === contactId) 
    console.log(contactById);
    return contactById;
  } catch (error) {
    throw error;
  }
}

const removeContact = async (contactId) => {
  try {
  const contactsList = await listContacts()
  const removedContact = contactsList.find((contact) => String(contact.id) === contactId)
  const newContactList = contactsList.filter(contact => String(contact.id) !== contactId) 
  await fs.writeFile(contactsPath, JSON.stringify(newContactList)) 
  return removedContact;
} catch (error) {
  throw error;
}
}


const addContact = async (body) => {
  try {
    const contactsList = await listContacts();
    const newContact = { id: uuid(), ...body}
    await fs.writeFile(contactsPath,JSON.stringify([...contactsList, newContact,]))
    return newContact
    
  } catch (error) {
    throw error;
  }
}

const updateContact = async (contactId, body) => {
  try {
   const contactsList = await listContacts()
  const contact = contactsList.find((contact) => String(contact.id) == contactId)
  const updatedContact = { ...contact, ...body }
  const updatedContactsList = JSON.stringify(contactsList.map((contact) => (String(contact.id) === contactId ? updatedContact : contact)))
  await fs.writeFile(contactsPath, updatedContactsList)
  return updatedContact;
 } catch (error) {
   throw error;
 }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
