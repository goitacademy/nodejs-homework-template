const express = require('express');
const contacts = require('../../models/contacts.js');
const Joi = require('joi');
const { HttpError } = require('../../helpers/index.js');

const router = express.Router()

const contactUpdateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try{
    res.json({
      status: 'success',           
      code: 200,
      data: await contacts.listContacts()
    })
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

    if(contact === null) throw HttpError(404);

    res.status(200).json({
      code: 200,
      contact: contact
    });
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
    console.log('REQUEST BODY', req.body)
    const { error } = contactUpdateSchema.validate(req.body);
    
    // if(typeof contact === 'string') throw Error(contact);
    if(error) {
      // throw HttpError(400, error.message.replace(/\"/g, ''))
      throw HttpError(400, error.message)
    }
    
    const contact = await contacts.addContact(req.body)
    
    res.status(201).json({
      code: 201,
      data: contact
    })
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
    if (contact === undefined) throw Error('Not found');

    res.json({ 
      code: 200,
      message: 'Contact deleted',
      deletedContact: contact
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