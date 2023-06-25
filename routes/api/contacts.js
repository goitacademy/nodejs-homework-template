const express = require('express');
const router = express.Router();
const createError = require("http-errors");
const Joi = require ("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().min(7).max(16).required(),

});

const contactsOperations = require('../../models/contacts');

router.get('/', async (req, res, next) => {
 try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    });
 } catch (error) {
    next(error);
 }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (result ===  null) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    });
 } catch (error) {
    next(error);
 }

});



router.post('/', async (req, res, next) => {
  try {
    const {error} = productSchema.validate(req.body);
    if (error){
      error.status = 400;
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    });
 } catch (error) {
    next(error);
 }
});



router.delete('/:contactId', async (req, res, next) => {
  const {id} = req.params;

  res.json({ message: 'template message @ DELETE /api/contacts/:id' })
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message @ PUT /api/contacts/:id' })
});

module.exports = router;
