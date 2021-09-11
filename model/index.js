const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')

const { v4 } = require('uuid')

const readContactsFile = async (contacts) => {
  const data = await fs.readFile(contacts, 'utf8')

  return JSON.parse(data)
}
const listContacts = async () => {
  try {
    return await readContactsFile(contactsPath)
  } catch (error) {
    console.error(error.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await readContactsFile(contactsPath)

    if (contacts.some((contact) => contact.id === Number(contactId))) {
      const contactById = contacts.find(
        (contact) => contact.id === Number(contactId)
      )
      return contactById
    }
  } catch (error) {
    console.error(error.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await readContactsFile(contactsPath)

    if (contacts.some((contact) => contact.id === Number(contactId))) {
      const newContacts = contacts.filter(
        (contact) => contact.id !== Number(contactId)
      )
      await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))

      return newContacts
    }
  } catch (error) {
    console.error(error.message)
  }
}

const addContact = async (body) => {
  const { name, email, phone } = body

  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  }

  try {
    const contacts = await readContactsFile(contactsPath)

    const newContacts = [...contacts, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))

    return newContact
  } catch (error) {
    console.error(error.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContactsFile(contactsPath)

    const needContact = contacts.find(
      (contact) => contact.id === Number(contactId)
    )
    if (needContact) {
      const updatedContact = { ...needContact, ...body, }

      const result = contacts.map((contact) => {
        if (contact.id === Number(contactId)) {
          return updatedContact
        } else return contact
      })
      await fs.writeFile(contactsPath, JSON.stringify(result, null, 2))

      return updatedContact
    }
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
