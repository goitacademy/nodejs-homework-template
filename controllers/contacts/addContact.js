const fs = require("fs/promises")
const path = require("path")
const { nanoid } = require("nanoid")

const contactsPath = path.join(__dirname, "../../models/contacts.json")
const { HttpError } = require("../../helpers")
const { addSchema } = require("../../schemas")

const addContact = async (req, res) => {
        const body = req.body
        const { error } = addSchema.validate(body)
        if (error) {
            throw HttpError(400, "Missing required name field")
        }
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        const newContact = { id: nanoid(), ...body }
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        res.status(201).json(newContact)
}

module.exports = addContact