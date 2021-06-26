const fs = require('fs').promises
const path = require('path')

const contactsPath = path.join(__dirname, '../../data/contacts.json')

const writeContacts = async (newContacts) => {
    const contactsStr = JSON.stringify(newContacts)
    await fs.writeFile(contactsPath, contactsStr)
}

module.exports = writeContacts;