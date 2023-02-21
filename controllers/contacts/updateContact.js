const fs = require("fs/promises")
const path = require("path")

const contactsPath = path.join(__dirname, "../../models/contacts.json")
const { HttpError } = require("../../helpers")
const { addSchema } = require("../../schemas")

const updateContact = async (req, res) => {
        const { error } = addSchema.validate(req.body)
        if (error) {
            throw HttpError(400, "Missing fields")
        }

        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)

        const { id } = req.params
        const { name, email, phone } = req.body

        const currentIndex = contacts.findIndex((contact) => contact.id === id);
        if (currentIndex === -1) {
            throw HttpError(404, "Not found")
        }
        contacts[currentIndex] = { id, name, email, phone };
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        res.json(contacts[currentIndex])
}

module.exports = updateContact