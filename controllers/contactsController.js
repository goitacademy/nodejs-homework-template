import contactsService from '../models/contactsService.js'
import { addContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js'
import { HttpError } from '../helpers/HttpError.js'

const getAll = async (req, res, next) => {
    try {
        const data = await contactsService.listContacts()
        res.json(data)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const data = await contactsService.getContactById(contactId)
        if (!data) {
            throw HttpError(404, 'Not found')
        }
        res.json(data)
    }
    catch (error) {
        next(error)
    }
}

const addContact = async (req, res, next) => {
    try {
        const contact = req.body
        const { error } = addContactSchema.validate(contact)
        if (error) {
            throw HttpError(400, error.message)
        }
        const data = await contactsService.addContact(contact)
        res.status(201).json(data)
    }
    catch (error) {
        next(error)
    }
}

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const data = await contactsService.removeContact(contactId)
        if (!data) {
            throw new Error("Not found")
        }
        res.json({ message: "contact deleted" })
    } catch (error) {
        next(error)
    }
}

const updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const body = req.body
        const { error } = updateContactSchema.validate(body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const data = await contactsService.updateContact(contactId, body)
        res.json(data)
    }
    catch (error) {
        next(error)
    }
}

export default {
    getAll,
    getById,
    addContact,
    removeContact,
    updateContact,
}