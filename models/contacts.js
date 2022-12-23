const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('models', 'contacts.json')

// const getAll = async() =>  {
//   const res = await fs.readFile(contactsPath, 'utf8')
//   return JSON.parse(res)
// }

const listContacts = async () => {
  try {
    const res = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(res)
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  console.log('contactId', contactId)
  try {
    const contactList = await listContacts()
    const [contact] = contactList.filter(el => el.id === contactId)
    // const contact = contactList.find(el => el.id === contactId)
    return contact;
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const contactList = await listContacts()
    // const newContactList = JSON.stringify(contactList.filter(contact => contact.id !== contactId), null, 2)
    const deleteContactIdx = contactList.findIndex(contact => contact.id === contactId)
    console.log(deleteContactIdx)
    if (deleteContactIdx === -1) {
      return null
    }
    contactList.splice(String(deleteContactIdx), 1)
    await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2))
    return await listContacts()
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  const newContact = {
    id: uuidv4(),
    ...body
  }
  try {
    const contactList = await listContacts()
    contactList.push(newContact)
    const newContactList = JSON.stringify(contactList, null, 2)
    await fs.writeFile(contactsPath, newContactList)
    return await listContacts()
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  console.log('body:', body)
  try {
    const contactList = await listContacts()
    const [changeContact] = contactList.filter(contact => contact.id === contactId)
    changeContact.name = body.name;
    changeContact.email = body.email;
    changeContact.phone = body.phone;
    // console.log('changeContact:', changeContact)
    // console.log('contactList:', contactList)
    const newList = JSON.stringify(contactList, null, 2)
    await fs.writeFile(contactsPath, newList)
    return changeContact
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
