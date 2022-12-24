const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.resolve('models', 'contacts.json')

const changeContactsData = async (newList) => {
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2))
}

const getAll = async() =>  {
  const res = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(res)
}

const listContacts = async () => {
  try {
    return await getAll()
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  console.log('contactId', contactId)
  try {
    const contactList = await getAll()
    const [contact] = contactList.filter(el => el.id === contactId)
    return contact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const contactList = await getAll()
    const deleteContactIdx = contactList.findIndex(contact => contact.id === contactId)
    if (deleteContactIdx === -1) {
      return null
    }
    contactList.splice(String(deleteContactIdx), 1)
    changeContactsData(contactList)
    return
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
    const contactList = await getAll()
    contactList.push(newContact)
    changeContactsData(contactList)
    return newContact
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  console.log('body:', body)
  try {
    const contactList = await getAll()
    const [updatedContact] = contactList.filter(contact => contact.id === contactId)
    if (!updatedContact) {
      return null
    }
    updatedContact.name = body.name
    updatedContact.email = body.email
    updatedContact.phone = body.phone
    changeContactsData(contactList)
    return updatedContact
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
