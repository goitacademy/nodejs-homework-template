const express = require('express');
const Joi = require('joi');
// const {NotFound} = require("http-errors");

const router = express.Router();
const contactsOperations = require('../../models/contacts');

const contactSchema = Joi.object({
  name:Joi.string()
         .min(3)
        .max(30)
        .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(2)
    .max(15)
  .required(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: 'succes',
      code: 200,
      data: {
        result:contacts,
      },
    })
  } catch (error) {
    next(error);
  }
 
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      // throw new NotFound(`Contact with id ${contactId} not found`);
      return res.status(404).json({ "message": "Not found" });
    };
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch(error) {
    next(error);
  };
  
})

router.post('/', async (req, res, next) => {
  try { 
    const { error } = contactSchema.validate(req.body);
    if (error) {
      // error.status = 400;
      // throw error;
      return res.status(400).json({"message": "missing required name field" });
    }
   
    const contact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact
      },
    });
  
  } catch (error) {
      next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {const { contactId } = req.params;
  const contact = await contactsOperations.removeContact(contactId);
  if (!contact) {
  //  throw new NotFound(`Contact with id ${contactId} not found`);
    return res.status(404).json({ "message": "Not found" });
  }
  res.json({
    "status": 'success',
    "code": 200,
    "message": "contact deleted",
   data:{contact},
  })
    
  } catch(error) {
next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      // error.status = 400;
      // throw error;
      return res.status(400).json({"message": "missing fields" });
    }
    const { contactId } = req.params;
    const contact = await contactsOperations.updateContact(contactId, req.body);
    if (!contact) {
      return res.status(404).json({ "message": "Not found" });
    };
    res.json({
      status: 'success',
      code: 200,
      data: { contact },
    });
  } catch(error) {
    next(error);
}
})

module.exports = router
