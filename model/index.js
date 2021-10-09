const fs = require('fs/promises')
const path = require('path')
const contacts = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contacts)
    return normalizationData(data)
  } catch (error) {
    console.table(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contacts)
    return normalizationData(data).find(({ id }) => id === Number(contactId))
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

const normalizationData = (data) => {
  const dataToSting = data.toString()
  return JSON.parse(dataToSting)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
