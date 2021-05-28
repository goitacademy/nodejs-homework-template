const fs = require('fs/promises')
const path = require('path')
const { v4: uuid } = require('uuid')

const contactsPath = path.join(__dirname, 'contacts.json')

const readData = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(data)
}

const listContacts = async () => {
  return await readData()
}

const getContactById = async (id) => {
  const data = await readData()
  const [result] = data.filter((el) => el.id === id)
  return result
}

const removeContact = async (id) => {
  try {
    const deletedContact = getContactById(id)
    if (!deletedContact) return

    const contacts = await readData()
    const filteredContacts = contacts.filter((contact) => {
      return contact.id !== id
    })

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts))
    return deletedContact
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  const id = uuid()
  const record = {
    id,
    ...body,
    ...(body.isFavourite ? {} : { isFavourite: false }),
  }
  const data = await readData()
  const newRecord = [...data, record]
  await fs.writeFile(contactsPath, JSON.stringify(newRecord))
  return record
}

const updateContact = async (id, body) => {
  const data = await readData()
  const [result] = data.filter((el) => el.id === id)
  if (result) {
    Object.assign(result, body)
    await fs.writeFile(contactsPath, JSON.stringify(data))
  }
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
