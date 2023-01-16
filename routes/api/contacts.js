const express = require('express');
const { NotFound } = require('http-errors');
const Joi = require('joi');

const contactOperations = require('../../models/contacts');
const router = express.Router();

const contactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .regex(/^\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})$/)
    .message('Phone format (xxx) xxx-xxxx')
    .required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactOperations.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    // next(error);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'server error',
    });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperations.getContactById(contactId);

    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
      // const error = new Error(`Product with id=${contactId} not found`);
      // error.status = 404;
      // throw error;
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `Product with id=${contactId} not found`,
      // });
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'server error',
    // });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    // make validation of request
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contactOperations.addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });

    // const newContact = { id: v4(), ...req.body };
    // contacts.push(newContact);
    // res.status(201).json({
    //   status: 'success',
    //   code: 201,
    //   data: {
    //     result: newContact,
    //   },
    // });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperations.removeContact(contactId);
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }

    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    // make validation of request
    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;

    const result = await contactOperations.updateContact(contactId, req.body);

    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
