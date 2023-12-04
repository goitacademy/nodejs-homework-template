import { Contact } from '../models/Contact.js'
import { addContactSchema, addToFavoriteSchema, updateContactSchema } from '../schemas/contactsSchemas.js'
import { HttpError } from '../helpers/HttpError.js'

const getAll = async (req, res, next) => {
    try {
        const data = await Contact.find()
        res.json(data)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const data = await Contact.findById(contactId)
        if (!data) {
            throw HttpError(404, 'Contact not found');
        }
        res.json(data)
    }
    catch (error) {
        console.log(error)
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
        const data = await Contact.create(contact)
        res.status(201).json(data)
    }
    catch (error) {
        next(error)
    }
}

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const data = await Contact.findByIdAndDelete(contactId)
        if (!data) {
            throw HttpError(404, 'Contact not found');
        }
        res.json({ message: "contact deleted" })
    } catch (error) {
        next(error)
    }
}

const updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const data = await Contact.findByIdAndUpdate(contactId, req.body)
        if (!data) {
            throw HttpError(404, 'Contact not found');
        }
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