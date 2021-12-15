const express = require('express');
const { NotFound, BadRequest } = require('http-errors');
const Joi = require('joi');
const contactsOperations = require('../../model/contacts-operations/operations');

const router = express.Router();

const joiSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

// get all contacts:
router.get('/', async (_, res, next) => {
  try {
    const contacts = await contactsOperations.getAllContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// get one contact by id:
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await contactsOperations.getContactById(id);

    if (!contact) {
      throw new NotFound();
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

// add new contact:
router.post('/', async (req, res, next) => {
  try {
    const newContactData = req.body;
    const { error } = joiSchema.validate(newContactData);
    if (error) {
      throw new BadRequest(error.message);
    }
    const newContact = await contactsOperations.addNewContact(newContactData);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// delete contact by ID:
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactToDelete = await contactsOperations.removeContactById(id);
    if (!contactToDelete) {
      throw new NotFound();
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

// update contact by ID:
router.put('/:id', async (req, res, next) => {
  const update = req.body;
  try {
    const { error } = joiSchema.validate(update);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { id } = req.params;
    const contactToUpdate = await contactsOperations.updateContactById({
      id,
      ...update,
    });
    if (!contactToUpdate) {
      throw new NotFound();
    }
    res.json(contactToUpdate);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
