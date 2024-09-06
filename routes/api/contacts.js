const express = require('express');
const { getAllContacts, getContactById, createContact, updateExistingContact, deleteContact } = require('../../controllers/contactController');
const { createContactSchema } = require('../../validation/contactValidation');
const router = express.Router();

router.get('/', getAllContacts);

router.get('/:contactId', getContactById);

router.post('/', async (req, res, next) => {
    const { error } = createContactSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
}, createContact);

router.put('/:contactId', async (req, res, next) => {
    const { error } = createContactSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
}, updateExistingContact);

router.delete('/:contactId', deleteContact);

module.exports = router;
