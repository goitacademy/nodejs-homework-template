const fs = require('fs/promises')
const path = require('path')
const { customAlphabet } = require('nanoid')

const nanoid = customAlphabet('1234567890', 5)
const contactsPath = path.join(__dirname, 'contacts.json')

async function readDataFromFile(pathname) {
  try {
    const fileData = await fs.readFile(pathname, 'utf-8')
    return JSON.parse(fileData)
  } catch (error) {
    console.error(error.message)
    return false
  }
}

async function writeDataToFile(pathname, data) {
  try {
    await fs.writeFile(pathname, JSON.stringify(data), 'utf-8')
    return true
  } catch (error) {
    console.error(error.message)
    return false
  }
}

const listContacts = async () => {
  const parsedData = await readDataFromFile(contactsPath)
  if (parsedData) return parsedData
  else return false
}

const getContactById = async (contactId) => {
  const parsedData = await readDataFromFile(contactsPath)
  if (parsedData) {
    const contactIdInteger = parseInt(contactId)
    const contactData = parsedData.find(contact => contact.id === contactIdInteger)
    return contactData
  } return false
}

const addContact = async (body) => {
  const contactData = { id: parseInt(nanoid()), ...body }
  const parsedData = await readDataFromFile(contactsPath)
  if (parsedData) {
    parsedData.push(contactData)
    return await writeDataToFile(contactsPath, parsedData) ? contactData : false
  } return false
}

const removeContact = async (contactId) => {
  let parsedData = await readDataFromFile(contactsPath)
  if (parsedData) {
    const contactIdInteger = parseInt(contactId)
    if (parsedData.some(contactData => contactData.id === contactIdInteger)) {
      parsedData = parsedData.filter(contactData => contactData.id !== contactIdInteger)
      return !!await writeDataToFile(contactsPath, parsedData)
    } else return undefined
  } return false
}

const updateContact = async (contactId, body) => {
  let parsedData = await readDataFromFile(contactsPath)
  if (parsedData) {
    const contactIdInteger = parseInt(contactId)
    let contactData = parsedData.find(contact => contact.id === contactIdInteger)
    if (contactData) {
      contactData = { ...contactData, ...body }
      parsedData = parsedData.filter(contactData => contactData.id !== contactIdInteger)
      parsedData.push(contactData)
      return await writeDataToFile(contactsPath, parsedData) ? contactData : false
    } else return undefined
  } return false
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
