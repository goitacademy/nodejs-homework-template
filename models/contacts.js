// contacts.js
const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, '..', 'models', 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

const getContactById = async id => {
  const contacts = await listContacts()
  const result = contacts.find(item => item.id === id)
  return result || null
}

const removeContact = async id => {
  const contacts = await listContacts()

  const index = contacts.findIndex(item => item.id === id)
  if (index === -1) {
    return null
  }
  const [result] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

const addContact = async body => {
  const contacts = await listContacts()

  // создаем новую. Добавляем id и данные которые приходят
  const newContact = {
    //
    id: nanoid(),
    ...body
  }

  contacts.push(newContact)
  // перезаписываем все
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

  return newContact
}

const updateContact = async (id, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id === id)
  if (index === -1) {
    return null
  }
  // перезаписываем книгу по индексу books[index]
  contacts[index] = { id, ...body }
  // перезаписываем JSON
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
