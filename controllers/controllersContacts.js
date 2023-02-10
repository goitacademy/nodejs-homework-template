const fs = require("fs/promises")
const path = require("path")
const { nanoid } = require("nanoid")

const contactsPath = path.join(__dirname, "../models/contacts.json")
const { HttpError } = require("../helpers")
const { addSchema } = require("../schemas")

const listContacts = async (req, res) => { 
    try {
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        res.json(contacts)
    } catch (error) {
        HttpError(404)
    }
}

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

const addContact = async (req, res) => {
    try {
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
    } catch (error) {
        const { status = 500, message = "Server error" } = error
        res.status(status).json({ message, })
    }
}

const removeContact = async (req, res) => {
    try {
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
    } catch (error) {
        const { status = 500, message = "Server error" } = error
        res.status(status).json({ message, })
    }
}

const updateContact = async (req, res) => {
    try {
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
    } catch (error) {
        const { status = 500, message = "Server error" } = error
        res.status(status).json({ message, })
    }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
}