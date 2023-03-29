const express = require('express');
const contacts = require("../../models/contacts.js");
const contactsSchema = require("../../schemas/contactsSchema.js");


const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const response = await contacts.listContacts();
    res.json(response);
  }
  catch(error){
    next(error);
  }; 
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const response = await contacts.getContactById(req.params.contactId);
    if(response === null){
      next();
    }
    else {
    res.json(response);
    };
  }
  catch(error) {
    next(error);
  };
});  

router.post('/', async (req, res, next) => {
  try {
    const {error} = contactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({"message": "missing required name field"});
    }
    else {
      const response = await contacts.addContact(req.body);
      res.status(201).json(response);
    }
  }
  catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const response = await contacts.removeContact(req.params.contactId);
    if(response === null){
      next();
    }
    else {
    res.json({"message": "contact deleted"});
    };
  }
  catch(error){
    next(error);
  }

});

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = contactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({"message": "missing fields"});
    }
    else {
      const response = await contacts.updateContact(req.params.contactId, req.body, );
      if(response === null) next()
      else res.json(response);
    };
  }
  catch (error) {
    next(error);
  }
  
});

module.exports = router;
