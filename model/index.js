const fs = require('fs').promises
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')
const { schema, generateId } = require('./validation.js')

const listContacts = async () => {
  return await fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .catch(error => { throw error })
}

const getContactById = async (contactId) => {
  return await fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data)
      const [result] = contacts.filter((contact) => {
        return contact.id == contactId
      })
      console.log(result)
      if (result) {
        return result
      } else {
        throw { message: 'contact not found' }
      }
    }
    )
    .catch(error => { throw error })
}

const removeContact = async (contactId) => {
  return await fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data)
      let contactToDelete = false

      contacts.map((contact, index) => {
        if (contact.id == contactId) {
          contactToDelete = index
        }
      })

      if (contactToDelete === false) {
        throw { message: 'contact not found' }
      } else {
        contacts.splice(contactToDelete, 1)
        fs.writeFile(contactsPath, JSON.stringify(contacts))
      }
    })
    .catch(error => { throw error })
}
const addContact = async (body) => {
  try {
    await schema.validateAsync(body)
    return await fs.readFile(contactsPath)
      .then((data) => {
        const contacts = JSON.parse(data)
        const id = generateId(contacts)
        const contact = { id, ...body }
        contacts.push(contact)
        fs.writeFile(contactsPath, JSON.stringify(contacts))
        return contact
      })
      .catch(error => { throw error })
  } catch (err) {
    throw error
  }
}

const updateContact = async (contactId, body) => {
  try {
    await getContactById(contactId)

    let contacts = await fs.readFile(contactsPath)
    contacts = JSON.parse(contacts)

    const updatedContacts = contacts.map((contact) => {
      if (contact.id == contactId) {
        contact = { ...contact, ...body }
      }
      return contact
    })

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))
  } catch (error) {
    throw error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
