/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const { contactSchema } = require('../../validation');

const contactsOperations = require('../../model/contacts/index');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    // const { id } = req.params.contactId;
    const contact = await contactsOperations.getContactById(
      req.params.contactId,
    );
    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    return res.json({ contact });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.message,
      });
    }
    // console.log(req.body);
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    // const { id } = req.params.contactId;
    const deleteContact = await contactsOperations.removeContact(
      req.params.contactId,
    );
    if (!deleteContact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    return res.json({ deleteContact });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.message,
      });
    }
    const updateContact = await contactsOperations.updateContact(
      req.params.contactId,
      req.body,
    );
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.json({
      updateContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
