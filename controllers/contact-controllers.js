import * as contactsServer from '../models/contacts.js'
import { contactAddSchema, contactUpdateSchema } from '../schemas/contact-schemas.js'
import httpError from '../error/httpError.js'

const getContactsAll = async(req, res, next) => {
    try{
        const results = await contactsServer.listContacts()
        res.json(results)
    } catch(error) {
        next(error)
    }
}

const getById = async(req, res, next) => {
    try{
        const {contactId} = req.params
        const results = await contactsServer.getContactById(contactId)
        if(!results) {
          throw httpError(404, "Not Found")
        }
        res.json(results)
    } catch (error) {
        next(error)
    }
}

const add = async(req, res, next) => {
    try{
        const{error} = contactAddSchema.validate(req.body)
        if(error) {
            throw httpError(400, error.message)
        }
        const results = await contactsServer.addContact(req.body)
        res.status(201).json(results)
    } catch (error) {
        next(error)
    }
}

const deleteById = async(req, res, next) => {
    try {
        const {contactId} = req.params 
        const results = await contactsServer.removeContact(contactId)
        if(!results) {
            throw httpError(404, "Not Found")
        }
        res.json({message: "contact deleted"})
    } catch (error) {
        next(error)
    }
}

const updateContactById = async(req, res, next) => {
    try{
        const {error} = contactUpdateSchema.validate(req.body)
        if(error) {
            throw httpError(400, error.message)
        }
        const {contactId} = req.params
        const results = await contactsServer.updateContact(contactId, req.body)
        if(!results) {
            throw httpError(404, "Not Found")
        }
        res.json(results)
    } catch (error) {
        next(error)
    }
}

export default {
    getContactsAll,
    getById,
    add,
    deleteById,
    updateContactById
}