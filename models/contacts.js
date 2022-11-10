const fs = require('fs/promises')
const path = require('path')
const { randomUUID } = require('crypto')

const contactsPath = path.resolve(__dirname, './contacts.json')

const read = async () => {
  const binaryData = await fs.readFile(contactsPath)
  const dataJSON = binaryData.toString()
  const dataArray = JSON.parse(dataJSON)
  return dataArray
}
const write = async (data) => {
  const content = JSON.stringify(data)
  await fs.writeFile(contactsPath, content, 'utf8')
}

const listContacts = async () => {
  const contacts = await read()
  return contacts
}

const getById = async (contactId) => {
  try {
    const contacts = await read()
    const contact = contacts.find((contact) => contact.id === contactId)
    return contact
  } catch (error) {
    console.log(
      `Error:${error} occurred when try to get contact with ID: ${contactId}`,
    )
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await read()
    const dataArrayUpdated = contacts.filter((el) => el.id !== contactId)
    if (dataArrayUpdated.length === contacts.length) {
      return null
    }
    await write(dataArrayUpdated)
    return contactId
  } catch (error) {
    console.log(`Error:${error} occurred`)
  }
}

const addContact = async (body) => {
  const { name, email, phone } = body

  try {
    const dataArray = await read()
    const generatedID = randomUUID()
    const contact = { id: generatedID, name, email, phone }
    dataArray.push(contact)
    await write(dataArray)
    return contact
  } catch (error) {
    console.log(`Error:${error} occurred when try to add contact`)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await read()
    let isUpdated = null
    const dataArrayUpdated = contacts.map((el) => {
      if (el.id === contactId) {
        isUpdated = { ...el, ...body }
        return isUpdated
      }
      return el
    })

    await write(dataArrayUpdated)
    return isUpdated
  } catch (error) {
    console.log(`Error:${error} occurred when try to add contact`)
  }
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
