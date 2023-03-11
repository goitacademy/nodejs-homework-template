const express = require('express');
const createError = require('http-errors');
const Joi = require('joi');

const contactsOperations = require('../../models/contacts');

const schema = Joi.object({
  name: Joi.
});

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
    next(err);
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'Server error',
    // });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);

    if (!result) {
      throw createError(404, 'Not found');
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: 'Not found',
      // });
      // return;
    }

    res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'Server error',
    // });
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
      throw createError(400, 'missing required name field');
      // res.status(400).json({
      //   status: 'error',
      //   code: 400,
      //   message: 'missing required name field',
      // });
      // return;
    }

    const result = await contactsOperations.addContact(req.body);

    res.status(201).json({
      status: 'added',
      code: 201,
      data: { result },
    });
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'Server error',
    // });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsOperations.removeContact(contactId);

    if (result === undefined) {
      throw createError(404, 'Not found');
      // res.status(404).json({
      //   status: 'succes',
      //   code: 404,
      //   message: 'Not found',
      // });
      // return;
    }
    res.status(200).json({
      status: 'succes',
      code: 200,
      message: 'contact deleted',
    });
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'Server error',
    // });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const { name, email, phone } = req.body;

    if (name === undefined || email === undefined || phone === undefined) {
      throw createError(400, 'missing fields');
      // res.status(400).json({
      //   status: 'succes',
      //   code: 400,
      //   message: 'missing fields',
      // });
      // return;
    }

    const result = await contactsOperations.updateContact(contactId, req.body);

    if (!result) {
      throw createError(404, 'Not found');
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: 'Not found',
      // });
      return;
    } else {
      res.json({
        status: 'success',
        code: 200,
        message: 'updated',
      });
    }
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'Server error',
    // });
  }
});

module.exports = router;
