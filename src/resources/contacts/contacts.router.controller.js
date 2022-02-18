const express = require('express')
const {contactsService} = require("./contacts.service");
const {validate} = require("../helper/middlewares/validate");
const {createContactSchema, updateContactSchema, idScheme, updateFavoriteContactSchema} = require("./contacts.schema");
const {serializeContactResponse, serializeContactsListResponse,} = require("./contact.serializes");
const {catchErrors} = require("../helper/middlewares/catchErrors");


const router = express.Router()


router.get('/', catchErrors(async (req, res, next) => {
    const contacts = await contactsService.getContacts()
    res.status(200).send(serializeContactsListResponse(contacts))
}))

router.post('/', validate(createContactSchema), catchErrors(async (req, res, next) => {
    const contact = await contactsService.createContact(req.body);
    res.status(201).send(serializeContactResponse(contact))
}))

router.get('/:id', validate(idScheme, 'params'), catchErrors(async (req, res, next) => {
    const contact = await  contactsService.getContact(req.params.id)
    res.status(200).send(serializeContactResponse(contact))
}))


router.put('/:id', validate(idScheme, 'params'), validate(updateContactSchema), catchErrors(async (req, res, next) => {
    const contact = await contactsService.updateContact(req.params.id, req.body);
    res.status(200).send(serializeContactResponse(contact))
}))

router.patch('/:id/favorite', validate(idScheme, 'params'), validate(updateFavoriteContactSchema), catchErrors(async (req, res, next) => {
    const contact = await contactsService.updateContact(req.params.id, req.body);
    res.status(200).send(serializeContactResponse(contact))
}))

router.delete('/:id', validate(idScheme, 'params'), catchErrors(async (req, res, next) => {
    await contactsService.deleteContact(req.params.id);
    res.status(200).send(`contact id(${req.params.id}) was deleted`)
}))

exports.contactsRouter = router