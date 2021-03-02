<<<<<<< HEAD
const Contact = require('./schemas/contact.js')

const listContacts = async () => {
  return await Contact.find({})
}

const getContactById = async (contactId) => {
  return await Contact.findOne({ _id: contactId })
}

const removeContact = async (contactId) => {
  return await Contact.findOneAndRemove({ _id: contactId })
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, body) => {
  const result = await Contact
    .findOneAndUpdate(
      contactId,
      { ...body },
      { new: true }
    )
  return result
=======
const fs = require('fs').promises
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')
const { generateId } = require('./helpers.js')

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
        return contact.id.toString() === contactId.toString()
      })

      if (result) {
        return result
      } else {
        throw new Error('Contact not found')
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

      contactToDelete = contacts.filter((contact) => { return contact.id.toString() === contactId.toString() }).map((_contact, index) => { return index })

      if (contactToDelete.length > 0) {
        contacts.splice(contactToDelete, 1)
        fs.writeFile(contactsPath, JSON.stringify(contacts))
      } else {
        throw new Error()
      }
    })
    .catch(error => { throw error })
}
const addContact = async (body) => {
  try {
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
    throw new Error()
  }
}

const updateContact = async (contactId, body) => {
  try {
    await getContactById(contactId)
    let contacts = await fs.readFile(contactsPath)
    contacts = JSON.parse(contacts)

    const updatedContacts = contacts.map((contact) => {
      if (contact.id === contactId) {
        contact = { ...contact, ...body }
      }
      return contact
    })

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))
  } catch (error) {
    throw new Error('contact not found')
  }
>>>>>>> master
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
