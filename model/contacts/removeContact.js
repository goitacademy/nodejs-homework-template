/* eslint-disable eol-last */
/* eslint-disable indent */
const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const removeContact = async(contactId) => {
    const contacts = await listContacts()
    const id = Number(contactId)
    const idx = Number(contacts.findIndex((item) => item.id === id))

    if (idx === -1) {
        return null
    }

    contacts.splice(idx, 1)
    updateContacts(contacts)

    return true
}

module.exports = removeContact