const express = require('express');
const router = express.Router();

const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts.js');
const { addContactValidation, putContactValidation } = require('../../middlewares/validationMiddleware');

router.get('/', async (req, res, next) => {
    try {
        const data = await listContacts();
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
});

router.get('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const data = await getContactById(contactId);
        if (!data) {
            return res.status(404).json({ message: "Not found" });
        }
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
});

router.post('/', addContactValidation, async (req, res, next) => {
    try {
        const data = await addContact(req.body);
        if (data === req.body.email) {
            return res.status(400).json({ message: `Сontact with such email ${req.body.email} already exists` });
        }
        res.status(201).json(data);
    }
    catch (error) {
        console.error(error);
    }
});

router.delete('/:contactId', async (req, res, next) => {
    try {
        const data = await removeContact(req.params.contactId);
        if (data === 404) {
            res.status(404).json({ message: "Not found" });
        }
        res.status(200).json({ message: "contact deleted" });
    }
    catch (error) {
        console.error(error);
    }
});

router.put('/:contactId', putContactValidation, async (req, res, next) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.phone) {
            return res.status(400).json({ message: "missing fields" });
        }
        const data = await updateContact(req.params.contactId, req.body);
        if (data === 404) {
            res.status(404).json({ message: "Not found" });
        }
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
});

module.exports = router;
