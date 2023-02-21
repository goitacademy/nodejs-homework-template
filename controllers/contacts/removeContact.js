const fs = require("fs/promises")
const path = require("path")

const contactsPath = path.join(__dirname, "../../models/contacts.json")
const { HttpError } = require("../../helpers")

const removeContact = async (req, res) => {
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        const { id } = req.params
        const result = contacts.filter(contact => contact.id !== id)
        if (contacts.length === result.length) {
            throw HttpError(404, "Not found")
        }
        await fs.writeFile(contactsPath, JSON.stringify(result));
        res.json({
            message: "Contact deleted"
        })
}

module.exports = removeContact