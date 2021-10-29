const crypto = require('crypto')
const { getAllContacts, updateContacts } = require('./methods')

const addContact = async (name, email, phone) => {
    const allContacts = await getAllContacts()
    const newContact = { id: crypto.randomUUID(), name, email, phone }
    allContacts.push(newContact)
    await updateContacts(allContacts)
    return newContact

}

module.exports = addContact