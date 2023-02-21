const fs = require("fs/promises")
const path = require("path")

const contactsPath = path.join(__dirname, "../../models/contacts.json")

const getAllContacts = async (req, res) => { 
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        res.json(contacts)
}

module.exports = getAllContacts