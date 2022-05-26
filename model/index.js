const fs = require('fs').promises
const path = require('path')

const contactsPath = path.resolve(__dirname, './contacts.json')

const { customAlphabet } = require('nanoid/async')
const nanoid = customAlphabet('1234567890abcdef', 10)

const readContactsFile = async (dataPath) => {
  const data = await fs.readFile(dataPath, 'utf8')
  const result = JSON.parse(data)
  return result
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

    const contact = contacts.find(
      ({ id }) => id.toString() === contactId
    )
    return contact
  } catch (error) {
    console.error(error.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await readContactsFile(contactsPath)

    if (contacts.some(({ id }) => id.toString() === contactId)) {
      const withoutRemoveContact = contacts.filter(
        ({ id }) => id.toString() !== contactId
      )

      await fs.writeFile(contactsPath, JSON.stringify(withoutRemoveContact))

      return withoutRemoveContact
    }
  } catch (error) {
    console.error(error.message)
  }
}

const addContact = async (body) => {
  const { name, email, phone } = body

  const contactNew = { id: await nanoid(), name, email, phone }

  try {
    const contacts = await readContactsFile(contactsPath)
    const contactsListNew = [contactNew, ...contacts]

    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsListNew, null, '\t')
    )
    return contactNew
  } catch (error) {
    console.error(error.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContactsFile(contactsPath)

    const requiredContact = contacts.find(
      ({ id }) => id === contactId
    )

    if (!requiredContact) {
      return null
    }

    const changedContact = {
      ...requiredContact,
      ...body,
    }

    const newContacts = contacts.map(contact => {
      if (contact.id === contactId) {
        return changedContact
      }
      return contact
    })

    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))

    return changedContact
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
