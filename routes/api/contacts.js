const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const contactsOperation = require('../../models/contacts');
const validateSchema = require('../../validation/validationShema');

const { 
    listContacts, 
    getContactById, 
    addContact, 
    removeContact, 
    updateContact 
} = contactsOperation;

const { contactAddSchema, contactUpdateSchema } = validateSchema;

router.get('/', async (req, res, next) => {
    const contacts = await listContacts();
    res.status(200).json({ data: contacts });
})


router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const contactById = await getContactById(id);

    if (!contactById) {
      return next(createError(404, 'Not found'));
    }

    res.status(200).json({ data: contactById });
})


router.post("/", async (req, res, next) => {
    const validationResult = contactAddSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details,
      });
    }

    const newContact = await addContact(req.body);
    res.status(201).json({ data: newContact });
});


router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    const contactDeleted = await removeContact(id);

    if (!contactDeleted) {
      return next(createError(404, "Not found"));
    }

    res.status(200).json({ message: "contact deleted" });
});


router.put("/:id", async (req, res, next) => {
    const validationResult = contactUpdateSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details,
      });
    }

    const { id } = req.params;
    const contactUpdated = await updateContact(id, req.body);

    if (!contactUpdated) {
      return next(createError(404, "Not found"));
    }

    res.status(200).json({ data: contactUpdated });
});

module.exports = router;
