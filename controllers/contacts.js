/* eslint-disable eol-last */
/* eslint-disable indent */
const { NotFound, BadRequest } = require('http-errors')

const contactsOperations = require('../model/contacts')

const listContacts = async(req, res, next) => {

        const contacts = await contactsOperations.listContacts()
        res.json({
            status: 'success',
            code: 200,
            data: {
                contacts
            }
        })


        const getContactById = async(req, res, next) => {

                const id = req.params.contactId
                const contactById = await contactsOperations.getContactById(id)
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


                const addContact = async(req, res, next) => {
                    const { error } = joiSchema.validate(req.body)
                    if (error) {
                        throw new BadRequest({ message: 'missing required name field' })
                    }

                    const result = await contactsOperations.addContact(req.body)
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
                    const result = await contactsOperations.removeContact(id)
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

                    const { error } = joiSchema.validate(req.body)
                    if (error) {
                        throw new BadRequest({ message: 'missing fields' })
                    }
                    const id = req.params.contactId
                    const result = await contactsOperations.updateContact(id, req.body)
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

                module.exports = { listContacts, getContactById, addContact, removeContact, updateContact }