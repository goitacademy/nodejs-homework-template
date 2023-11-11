import contactService from '../models/contacts.js'
import Joi from 'joi'
import {HttpError} from '../helpers/index.js' 

const contactAddScheme = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
})

const getAllContacts = async (req, res) => {
    try {
        const result = await contactService.listContacts()
    res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    
}

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const result = await contactService.getContactById(contactId)
        if (!result) {
            throw HttpError(404, `Contact with id:${contactId} is not found`)
        }
        res.json(result)
    } catch (error) {
        next(error)
    }
}

const add = async (req, res, next ) => {
    try {
        const {error} = contactAddScheme.validate(req.body)
        if (error) {
           throw HttpError(400, error.message)
       }
        const result = await contactService.addContact(req.body)
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

export default {
    getAllContacts,
    getById,
    add
}