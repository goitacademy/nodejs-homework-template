const express = require('express')
const {contactsService} = require("./contacts.service");
const {validate} = require("../helper/middlewares/validate");
const {createContactSchema, updateContactSchema} = require("./contacts.schema");
const {serializeContactResponse, serializeContactsListResponse,} = require("./contact.serializes");
const {NotFound} = require("http-errors");


const router = express.Router()


router.get('/', async (req, res, next) => {
    const contacts = await contactsService.getContacts()

    res.status(200).send(serializeContactsListResponse(contacts))
})

router.post('/', validate(createContactSchema), async (req, res, next) => {
    const contact = await contactsService.createContact(req.body);
    res.status(201).send(serializeContactResponse(contact))
})

router.get('/:id', async (req, res, next) => {
    const contact = await contactsService.getContact(req.params.id)
    if (!contact) return next(new NotFound('contact not found'))
    res.status(200).send(serializeContactResponse(contact))
})


router.put('/:id', validate(updateContactSchema), async (req, res, next) => {
    const contact = await contactsService.updateContact(req.params.id, req.body);
    if (!contact) return next(new NotFound('contact not found'))
    res.status(200).send(serializeContactResponse(contact))
})

router.delete('/:id', async (req, res, next) => {
    const isDelited = await contactsService.deleteContact(req.params.id);
    if (!isDelited) return next(new NotFound('contact not found'))
    res.status(200).send(`contact id(${req.params.id}) was deleted`)
})

exports.contactsRouter = router