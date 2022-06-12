const express = require('express');
const { NotFound } = require("http-errors");
const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})
const router = express.Router();

const contactsOperations = require("../../models/contacts");

router.get('/', async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
    try {
       res.json({
         status:"success",
         code: 200,
         data:{
           result: contacts
         }
      })
    } catch (error) {
       res.status(500).json({
        status:"error",
        code: 500,
        message:"Server error"
    });
    }
});

router.get('/:contactId', async (req, res, next) => {
  try{
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
  if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
      status: "success",
      code: 200,
      data: {
          result
      }
  })
}
catch(error){
  next(error  )
}
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = contactsSchema.validate(req.body);
        if(error){
            error.status = 400;
            error.message = "missing required name field";
            throw error;}
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result
        }
    })
  }
  catch(error){
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try{
  const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
        throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
        status: "success",
        code: 204,
        message: "contact deleted",
        data: {
            result
        }
    })
  }
  catch(error){
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try{
    const {error} = contactsSchema.validate(req.body);
    console.log({error})
    if(error){
        error.status = 400;
        error.message = "missing fields";
        throw error;
    }
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId,req.body);
  if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
        result
    }
})
}
catch(error){
  next(error)
}
})

module.exports = router
