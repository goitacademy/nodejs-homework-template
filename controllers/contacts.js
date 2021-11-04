/* eslint-disable no-tabs */
const { NotFound } = require('http-errors')
const { Contact } = require('../models')

const listContacts = async (req, res) => {
	const { _id } = req.user
	const { page = 1, limit = 10 } = req.query
	const skip = (page - 1) * limit

  const contacts = await Contact.find({ owner: _id }, '_id content owner', { skip, limit: +limit }).populate('owner', 'email')
    res.json({
        status: 'success',
        code: 200,
        data: {
            contacts
        }
    })
}

const getContactById = async (req, res) => {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)
    if (!contact) {
        throw new NotFound(`Contact with id=${contactId} was not found`)
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            contact
        }
    })
}

const addContact = async (req, res) => {
    const addedContact = await Contact.create(req.body)
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            addedContact
        }
    })
}

const removeById = async (req, res) => {
    const { contactId } = req.params
    const contactData = await Contact.findById(contactId)
    const result = await Contact.findByIdAndDelete(contactId)
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

const updateContact = async (req, res) => {
    const { contactId } = req.params
    const beforeUpdate = await Contact.findByIdAndUpdate(contactId, req.body)
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!updatedContact) {
        throw new NotFound(`Product with id=${contactId} was not found`)
    }
    res.json({
        status: 'success',
        code: 200,
        beforeUpdate: {
            beforeUpdate
        },
        afterUpdate: {
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
