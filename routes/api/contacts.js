const express = require('express');
const joi = require('joi');

const contactsOperations = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contactsList = await contactsOperations.listContacts();

    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result: contactsList },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);

    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
      return;
    }

    res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body.name);

    if (
      body.name === undefined ||
      body.email === undefined ||
      body.phone === undefined
    ) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing required name field',
      });
      return;
    }

    const result = await contactsOperations.addContact(req.body);

    res.status(201).json({
      status: 'added',
      code: 201,
      data: { result },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsOperations.removeContact(contactId);

    if (result === undefined) {
      res.status(404).json({
        status: 'succes',
        code: 404,
        message: 'Not found',
      });
      return;
    }
    res.status(200).json({
      status: 'succes',
      code: 200,
      message: 'contact deleted',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const { name, email, phone } = req.body;

    if (name === undefined || email === undefined || phone === undefined) {
      res.status(400).json({
        status: 'succes',
        code: 400,
        message: 'missing fields',
      });
      return;
    }

    const result = await contactsOperations.updateContact(contactId, req.body);

    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
      return;
    } else {
      res.json({
        status: 'success',
        code: 200,
        message: 'updated',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
});

module.exports = router;
