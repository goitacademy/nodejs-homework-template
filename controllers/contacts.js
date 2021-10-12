/* eslint-disable spaced-comment */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable indent */
const { NotFound, BadRequest } = require('http-errors')

const { Contact } = require('../models')

const listContacts = async(req, res, next) => {
    const contacts = await Contact.find({})
    res.json({
        status: 'success',
        code: 200,
        data: {
            contacts
        }
    })
}

const getContactById = async(req, res, next) => {
    const id = req.params.contactId
    const contactById = await Contact.findById(id)
    if (!contactById) {
        throw new NotFound(`Contact with id=${id} not found`)
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            contactById
        }
    })
}

const addContact = async(req, res, next) => {
    const result = await Contact.create(req.body)
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            result
        }
    })
}

const removeContact = async(req, res, next) => {
    const id = req.params.contactId
    const result = await Contact.findByIdAndDelete(id)
    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`)
    }
    res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted'
    })
}

const updateContact = async(req, res, next) => {
    const id = req.params.contactId

    const result = await Contact.findByIdAndUpdate(id, { $set: req.body }, { new: true })

    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`)
    }

    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    })
}

const updateStatusContact = async(req, res, next) => {
    const id = req.params.contactId

    if (JSON.stringify(req.body) === '{}') {
        throw new BadRequest('missing field favorite')
    }

    const result = await Contact.findByIdAndUpdate(id, {
        $set: req.body
    }, { new: true })

    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`)
    }

    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    })
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
}