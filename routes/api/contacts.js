const express = require('express');
const { listContacts, getContactById, updateContact, addContact, removeContact } = require('../../models/contacts');

const router = express.Router()
const Joi = require('joi');

const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
    try {
        const list = await listContacts();
        res.status(200).json(list);
        if (!list) {
            res.status(404).json({
                message: 'No contacts list found',
            })
        };
    }
    catch (err) {
        next(err)
    }
});


router.get('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const list = await getContactById(contactId);
        res.status(200).json(list);
        if (!list) {
            res.status(404).json({
                message: 'No contact found'
            })
        }
    } catch (err) {
        next(err)
    }
})


router.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        const { error } = schema.validate(data);
        if (error) {
            res.status(404).json({
                message: 'No contact found'
            })
        }
        const newContact = await addContact(data);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
});


router.delete('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const message = await removeContact(contactId);
        console.log(removeContact(message));
        res.status(200).json({ message });  // 
        if (!message) {
            res.status(404).json({
                message: 'No contact found'
            })
        }
    } catch (err) { next(err) }


})

router.put('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const data = req.body;
        console.log(data);
        if (!data) {
            res.status(404).json({
                message: 'No contact found'
            });
        }
        const { error } = schema.validate(data);
        if (error) {
            res.status(404).json(error);
        }
        const contact = await updateContact(contactId, data);
        if (!contact) {
            res.status(404).json({
                message: 'No contact found'
            });
        }
        res.json(contact);
    } catch (error) {
        next(error);
    }
})

module.exports = router