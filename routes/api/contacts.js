const express = require('express');

const router = express.Router();

const contactsService = require("../../models/contacts");
const {HttpError} = require("../../helpers");

router.get('/', async (req, res, next) => {
  try {
    const contacts  = await contactsService.listContacts();
  res.json({result: contacts});
  } catch (error) {
    next(error);
  }
  
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
  const result = await contactsService.getContactById(contactId);
  if(!result){
    
    throw HttpError(404, `Contact with ${contactId} not found` )
  }
  res.json(result);
  } 
  catch (error) {
    next(error);
  }
  


  
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
