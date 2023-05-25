const express = require('express');
const contacts = require('../../models/contacts.js');
const Joi = require('joi');
const { HttpError } = require('../../helpers/index.js');

const router = express.Router()

const contactUpdateSchema = Joi.object({
  name: Joi
    .string()
    .required()
    .messages({
      'string.empty' : 'missing required name field'
    }),
  email: Joi.string()
    .required()
    .messages({
      'string.empty' : 'missing required email field'
    }),
  phone: Joi.string()
    .required()
    .messages({
      'string.empty' : 'missing required phone field'
    }),
})

router.get('/', async (req, res, next) => {
  try{
    res.json(
      await contacts.listContacts()
    )
  } catch (error) {
    next(error)
    // res.status(500).json({
    //   code: 500,
    //   message: 'Internal server error'
    // })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try{
    const contact = await contacts.getContactById(req.params.contactId);
    // console.log('GET by ID', contact)
    if(!contact) throw HttpError(404);

    res.status(200).json(
      contact
    );
  } catch (error) {
    next(error)
    // res.status(404).json({
    //   code: 404,
    //   message: 'Not found'
    // })
  }
})

router.post('/', async (req, res, next) => {
  try{
    // console.log('REQUEST BODY', req.body)
    if (Object.keys(req.body).length === 0) throw HttpError(400, 'Missing fields')
    const { error } = contactUpdateSchema.validate(req.body);
    
    if(error) {
      // throw HttpError(400, error.message.replace(/\"/g, ''))
      throw HttpError(400, error.message)
    }
    
    const contact = await contacts.addContact(req.body)
    
    res.status(201).json(
      contact
    )
  } catch (error) {
    next(error)
    // res.status(400).json({
    //   code: 400,
    //   message: error.message
    // })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try{
    const contact = await contacts.removeContact(req.params.contactId);
    if (contact === undefined) throw HttpError(404, 'Not found');

    res.json({ 
      message: 'Contact deleted',
    })
  } catch (error) {
    next(error)
    // res.status(404).json({
    //   code: 404,
    //   message: error.message
    // })
  }
})

router.put('/:contactId', async (req, res, next) => {
  try{
    if (Object.keys(req.body).length === 0) throw HttpError(400, 'Missing fields');
    
    const { contactId } = req.params;
    const { error } = contactUpdateSchema.validate(req.body);
    const { name, email, phone } = req.body;

    console.log(req.params)
    console.log(req.body)

    if(error) {
      throw HttpError(400, error.message)
    }

    const contact = await contacts.updateContact(contactId, {name, email, phone});

    if(!contact){
      throw HttpError(404)
    }

    res.json(contact);

  } catch (error) {
    next(error)
  }
  // res.json({ message: 'template message, PUT' })
})

module.exports = router