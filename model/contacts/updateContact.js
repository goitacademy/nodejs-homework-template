/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable spaced-comment */
/* eslint-disable eol-last */
const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const updateContact = async(contactId, body) => {
    const contacts = await listContacts()
    const id = Number(contactId)
    const idx = Number(contacts.findIndex((item) => item.id === id))
    if (idx === -1) {
        return null
    }
    contacts[idx] = {...contacts[idx], ...body }
    updateContacts(contacts)
    console.log(contacts[idx])
    return contacts[idx]
}
module.exports = updateContact