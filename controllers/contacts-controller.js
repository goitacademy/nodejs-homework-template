import contactService from '../models/contacts.js'
import { HttpError } from '../helpers/index.js' 
import { ctrlWrapper } from '../decorators/index.js'


const getAllContacts = async (req, res) => {
        const result = await contactService.listContacts()
        res.json(result)   
}

const getById = async (req, res) => {
        const { contactId } = req.params
        const result = await contactService.getContactById(contactId)
        if (!result) {
            throw HttpError(404, `Contact with id:${contactId} is not found`)
        }
        res.json(result)    
}

const add = async (req, res) => {
        const result = await contactService.addContact(req.body)
        res.status(201).json(result)
}


const updateById = async (req, res) => {
        const { contactId } = req.params
        const result = await contactService.updateContact(contactId, req.body)
         if (!result) {
            throw HttpError(404, `Contact with id:${contactId} is not found`)
        }
         res.json(result)
}

const deleteById = async (req, res) => {
        const {contactId} = req.params
        const result = await contactService.removeContact(contactId)
        if (!result) {
            throw HttpError(404, `Contact with id:${contactId} is not found`)
        }
        res.json({message: 'contact deleted'})   
}

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById)
}