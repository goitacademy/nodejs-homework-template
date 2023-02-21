const fs = require("fs/promises")
const path = require("path")

const contactsPath = path.join(__dirname, "../../models/contacts.json")

const getContactById = async (req, res) => {
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        const { id } = req.params
        const result = contacts.find(contact => contact.id === id)
        if (!result) {
            res.status(404).json({ message: `Not found contact with id:${id}` })
        }
        res.json(result)
}

module.exports = getContactById