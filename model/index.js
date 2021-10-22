const fs = require('fs/promises')
// const contacts = require('./contacts.json')

const path = require('path')

const contactsPath = path.join('model', 'contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data.toString())
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)

    const structuredData = JSON.parse(data.toString())
    const contact = structuredData.find((el) => {
      return el.id === Number(contactId)
    })
    return (contact)
  } catch (err) {
    console.log(err.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)

    const structuredData = JSON.parse(data.toString())
    const target = structuredData.find((el) => {
      return el.id === Number(contactId)
    })
    if (target) {
      const newData = structuredData.filter((el) => {
        return el.id !== Number(contactId)
      })
      await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2))
      return (target)
    }
  } catch (err) {
    console.log(err.message)
  }
}

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath)

    const structuredData = JSON.parse(data.toString())

    const newId = Number(Date.now().toString())
    const newContact = { id: newId, name: body.name, email: body.email, phone: body.phone }

    structuredData.push(newContact)

    await fs.writeFile(contactsPath, JSON.stringify(structuredData, null, 2))

    return (newContact)
  } catch (err) {
    console.log(err.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath)

    const structuredData = JSON.parse(data.toString())

    const target = structuredData.find((el) => {
      return el.id === Number(contactId)
    })
    if (target) {
      const renewedContact = { ...target, ...body }
      const newData = structuredData.map(contact => {
        return (contact.id === Number(contactId) ? renewedContact : contact)
      })
      await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2))
      return (renewedContact)
    }
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
