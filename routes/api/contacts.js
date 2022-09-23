const express = require('express');
const createError = require('http-errors');
const Joi = require('Joi');

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const contactsOperation = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await contactsOperation.getContactById(contactId);
    if (!result) {
      // ------- 1
      // const msgError = JSON.stringify({
      //   status: 'error',
      //   code: 404,
      //   message: `contact with id ${contactId} not found`,
      // });

      // const error = new Error(msgError);
      // error.status = 404;
      // throw error;

      throw createError(404, `contact with id ${contactId} not found`);

      // Подскажите, как в new Error передать объект как в примере ниже
      // ====================== 2

      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `contact with id ${contactId} not found`,
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
    //   message: `contact with id ${contactId} not found`,
    // });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      console.log(error);
      throw error;
    }
    const result = await contactsOperation.addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
