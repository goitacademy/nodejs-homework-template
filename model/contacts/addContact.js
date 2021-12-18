const { v4 } = require('uuid')

const updateSourceFile = require('./updateSourceFile')
const listContacts = require('./listContacts')

const addContact = async (body) => {
  const { name, email, phone } = body
  try {
    const newRecord = { id: v4(), name: name, email: email, phone: phone }
    const collection = await listContacts()
    const changedCollection = [...collection, newRecord]
    updateSourceFile(changedCollection)
    return newRecord
  } catch (error) {
    console.log(error)
  }
}

module.exports = addContact