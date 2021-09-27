/* eslint-disable eol-last */
/* eslint-disable indent */
const listContacts = require('./listContacts')

const getContactById = async(contactId) => {
    const contacts = await listContacts()
    const id = Number(contactId)
    const idx = Number(contacts.findIndex((item) => item.id === id))
    if (idx === -1) {
        return null
    }

    return contacts[idx]
}

module.exports = getContactById