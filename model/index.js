// const fs = require('fs/promises')
const fs = require('fs').promises
const path = require('path')
const { v4: uuid } = require('uuid')

const pathContacts = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    const response = await fs.readFile(pathContacts)
    const data = JSON.parse(response)
    return data
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const response = await listContacts()
    const findContactById = response.find(
      (el) => el.id.toString() === contactId
    )
    return findContactById
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const response = await listContacts()
    const filterElements = response.filter(
      (el) => el.id.toString() !== contactId
    )
    fs.writeFile(pathContacts, JSON.stringify(filterElements, null, 2))
    return filterElements
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  try {
    const record = {
      id: uuid(),
      ...body,
    }
    const contacts = await listContacts()
    const newContacts = [...contacts, record]
    fs.writeFile(pathContacts, JSON.stringify(newContacts, null, 2))
    return record
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const response = await listContacts()
    const updateContact = await getContactById(contactId)
    const record = Object.assign(updateContact, body)
    const arrWithoutUpdateContact = response.filter(
      (el) => el.id.toString() !== contactId
    )
    const newContactList = [...arrWithoutUpdateContact, record]
    await fs.writeFile(pathContacts, JSON.stringify(newContactList, null, 2))
    console.log(record)
    return record
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
