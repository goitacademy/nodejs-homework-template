const { NotFound } = require('http-errors')
const contactsOperations = require('../model/contacts')

const listContacts = async (req, res, next) => {
    const contacts = await contactsOperations.listContacts()
    res.json({
        status: 'success',
        code: 200,
        data: {
            contacts
        }
    })
}

const getContactById = async (req, res, next) => {
    const { contactId } = req.params
    const contact = await contactsOperations.getContactById(contactId)
    if (!contact) {
        throw new NotFound(`Contact with id=${contactId} was not found`)
    }
    res.json(contact)
}

const addContact = async (req, res, next) => {
    const addedContact = await contactsOperations.addContact(req.body)
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            addedContact
        }
    })
}

const removeById = async (req, res, next) => {
    const { contactId } = req.params
    const contactData = await contactsOperations.getContactById(contactId)
    const result = await contactsOperations.removeContact(contactId)
    if (!result) {
        throw new NotFound(`Contact with id=${contactId} was not found`)
    }
    res.json({
        status: 'success',
        code: 200,
        message: 'Contact was successfully deleted',
        deleted_contact: contactData
    })
}

const updateContact = async (req, res, next) => {
    const { contactId } = req.params
    const updatedContact = await contactsOperations.updateContactById(contactId, req.body)
    if (!updatedContact) {
        throw new NotFound(`Product with id=${contactId} was not found`)
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            updatedContact
        }
    })
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeById,
    updateContact
}
