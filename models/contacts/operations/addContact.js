const fs = require('fs/promises')
const { v4 } = require("uuid")

const listContacts = require('./listContacts')
const filePath = require("./filePath")

const addContact = async (body) => {
    const contacts = await listContacts()
    const newContact = { ...body, id: v4() }

    await fs.writeFile(filePath, JSON.stringify([...contacts, newContact]))

    return newContact
}

module.exports = addContact