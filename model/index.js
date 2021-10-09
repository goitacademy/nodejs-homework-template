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

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contacts)
    const updateContacts = normalizationData(data).filter(({ id }) => id !== Number(contactId))
    await fs.writeFile(contacts, JSON.stringify(updateContacts))
    if (normalizationData(data).length > updateContacts.length) {
      return { status: 200 }
    } else {
      return { status: 404 }
    }
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contacts)
    const processedData = normalizationData(data)
    const id = processedData.length + 1
    const newContact = { id, ...body }
    const updateContacts = JSON.stringify([...processedData, newContact])
    await fs.writeFile(contacts, updateContacts)
    return newContact
  } catch (error) {

  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contacts)
    let newContact = null
    const updateContacts = normalizationData(data).map((el) => {
      if (el.id === Number(contactId)) {
        newContact = { ...el, ...body }
        return { ...el, ...body }
      }
      return el
    })
    await fs.writeFile(contacts, JSON.stringify([...updateContacts]))

    return newContact
  } catch (error) {
    console.log(error)
  }
}

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
