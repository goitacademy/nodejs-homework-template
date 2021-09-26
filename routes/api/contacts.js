/* eslint-disable new-cap */
const express = require('express');
const { NotFound, BadRequest } = require('http-errors');
const Joi = require('joi');
const router = express.Router();

const contactsOperation = require('../../model/contacts');

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts
      }
    });
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async(req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperation.getContactById(contactId);
    if (!contact) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: 'ok',
      code: 200,
      data: { contact }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const result = await contactsOperation.addContact(req.body)
    res.json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.removeContact(contactId, req.body);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not faund`);
    }
    res.json({
      status: 'succes',
      code: 200,
      message: 'Success delete'
    });
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { contactId } = req.params;
    const result = await contactsOperation.updateById(contactId, req.body);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not faund`);
    }
    res.json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
})

module.exports = router
