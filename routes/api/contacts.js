const express = require('express');
const Joi = require('joi');

const { HttpError } = require('../../helpers');
const contacts = require('../../models/contacts');

const router = express.Router();

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
    try {
        const result = await contacts.listContacts();
        res.json(result);
    } catch (e) {
        next(e);
    }
});

router.get('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.getContactById(contactId);
        if (!result) {
            throw HttpError(404, 'Not found');
        }
        res.json(result);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
});

router.delete('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);
        res.json(result);
    } catch (e) {
        next(e);
    }
});

router.put('/:contactId', async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body);
        if (!result) {
            throw HttpError(404, 'Not found');
        }
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
