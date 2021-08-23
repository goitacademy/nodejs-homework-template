const fs = require('fs/promises')

const contactsPath = require('./contactsPath')
const listContacts = require('./listContacts')

const updateContact = async (contactId, body) => {
    const contactsList = await listContacts()
    const contactIndex = await contactsList.findIndex((el) => el.id === +contactId)

    if (!~contactIndex) {
        return null
    }

    contactsList[contactIndex] = { ...contactsList[contactIndex], ...body }
    await fs.writeFile(contactsPath, JSON.stringify(contactsList))
    return contactsList[contactIndex]
}

module.exports = updateContact