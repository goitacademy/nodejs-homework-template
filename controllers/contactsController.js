const contacts = require('../models/contacts')
const { addSchema } = require('../schemas/contacts')
const { RequestError } = require('../helpers')

const getAll = async (req, res, next) => {
    const result = await contacts.listContacts()
    res.json(result)
}

const getById = async (req, res, next) => {
    const { contactId } = req.params
    const result = await contacts.getById(contactId)
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json(result)
}

const addContact = async (req, res, next) => {
    const { error } = addSchema.validate(req.body)
    if (error) {
        throw RequestError(400, "Missing required name field")
    }
    const result = await contacts.addContact(req.body)
    return res.status(201).json(result)
}

const deleteById = async (req, res, next) => {
    const { contactId } = req.params
    const result = await contacts.removeContact(contactId)
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json({ message: "Contact deleted" })
}

const updateById = async (req, res, next) => {
    const { error } = addSchema.validate(req.body)
    if (error) {
        throw RequestError(400, "Missing fields")
    }
    const { contactId } = req.params
    const result = await contacts.updateContact(contactId, { ...req.body })
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json(result)
}

module.exports = { getAll, getById, addContact, updateById, deleteById }