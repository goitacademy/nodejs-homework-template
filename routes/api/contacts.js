const express = require('express');
const { v4 } = require('uuid');
const Joi = require("joi");
const router = express.Router();

const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,} = require('../../models/contacts');

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });
  const schemaUpdate = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  });
  
router.get('/', async (req, res, next) => {
  try{
    const contacts = await listContacts();
    res.status(200).json({
      status:'success',
      code:200,
      data:{result:contacts},
    });
  }catch(error){
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = 'missing required name field';
      throw error;
    }
    const result = await addContact({ id: v4(), ...req.body });
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
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (Object.keys(req.body).length === 0) {
      const error = new Error('missing fields');
      error.status = 400;
      throw error;
    }
    const { error } = schemaUpdate.validate(req.body);
    console.log(error);
    if (error) {
      error.status = 400;
      error.message = 'extra field found';
      throw error;
    }
    const result = await updateContact(contactId, req.body);
    if (!result) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;