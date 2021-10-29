const fs = require('fs/promises')
const path = require('path')
const pathContacts = path.join(__dirname, "./contacts.json")

const getAllContacts = async () => {
    const data = await fs.readFile(pathContacts, 'utf8')
    const contacts = JSON.parse(data)
    return contacts
}

const updateContacts = async (data) => {
    const strData = JSON.stringify(data)
    await fs.writeFile(pathContacts, strData)
}

module.exports = {getAllContacts, updateContacts}

