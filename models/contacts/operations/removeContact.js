const fs = require('fs/promises')

const listContacts = require('./listContacts')
const filePath = require("./filePath")

const removeContact = async (contactId) => {
    const contacts = await listContacts()
    const idx = contacts.findIndex(item => item.id === contactId)
    if (idx === -1) {
        return null
    }
    const newContacts = contacts.filter((_, index) => index !== idx)
    await fs.writeFile(filePath, JSON.stringify(newContacts))

    return contacts[idx]
}

module.exports = removeContact