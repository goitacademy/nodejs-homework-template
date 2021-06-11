const fs = require('fs/promises')
const { join } = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsFile = join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFile, { encoding: 'utf-8' })

    return JSON.parse(data)
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async contactId => {
  try {
    const data = await fs.readFile(contactsFile, { encoding: 'utf8' })
    const parsedData = await JSON.parse(data)

    const checkContact = parsedData.find(({ id }) => id === contactId)

    if (!checkContact) {
      return false
    }

    const contact = parsedData.filter(({ id }) => id === contactId)

    return contact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async contactId => {
  try {
    const data = await fs.readFile(contactsFile, { encoding: 'utf8' })
    const parsedData = await JSON.parse(data)

    const checkContact = parsedData.find(({ id }) => id === contactId)

    if (!checkContact) {
      return false
    }

    const contactsList = parsedData.filter(({ id }) => id !== contactId)

    await fs.writeFile(contactsFile, JSON.stringify(contactsList, null, 2))

    return true
  } catch (error) {
    console.log(error)
  }
}

const addContact = async body => {
  try {
    const data = await fs.readFile(contactsFile, { encoding: 'utf8' })
    const parsedData = await JSON.parse(data)

    body.id = uuidv4()
    const сontactList = [...parsedData, body]

    await fs.writeFile(contactsFile, JSON.stringify(сontactList, null, 2))
    return body
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsFile, { encoding: 'utf8' })
    const parsedData = await JSON.parse(data)
    let response = false

    const checkContact = parsedData.find(({ id }) => id === contactId)

    if (!checkContact) {
      return response
    }

    const contactList = parsedData.reduce((acc, contact) => {
      if (contact.id === contactId) {
        const newContact = Object.assign({}, contact, body)

        acc.push(newContact)
        response = newContact

        return acc
      } else {
        acc.push(contact)
        return acc
      }
    }, [])

    await fs.writeFile(contactsFile, JSON.stringify(contactList, null, 2))

    return response
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
