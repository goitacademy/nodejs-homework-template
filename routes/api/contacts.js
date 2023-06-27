const express = require('express');
const Joi = require('joi')

const contacts = require('../../models/contacts.js')
// const { request } = require('../../app.js')
const {RequestError} = require("../../helpers")

const router = express.Router();

const checkingSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
})

// console.log(contacts.listContacts());

router.get('/', async (req, res, next) => {
  
  try {
   const result = await contacts.listContacts()
   console.log(result);
  res.json(result)
  } catch (error) {
    next(error)
    // res.status(500).json({
    //   message: "Server error"
    // })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw RequestError(404,"Not found")
      // return res.status(404).json({
      //   message: "Not found"
    // })
    // const error = new Error("Not found");
    // error.status = 404;
    // throw error;
  }
    res.json(result)

  } catch (error) {
    next(error)
    // const {status=500, message="Server error"} = error;
    // res.status(status).json({
    //   message,
    // })
  }
  // res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    const {error} = checkingSchema.validate(req.body);
    if (error) {
      throw RequestError(400,error.message)
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
   
    const {contactId} = req.params;
    const result = 
    await contacts.removeContact(contactId);
    console.log(result);
      if (!result) {
       throw RequestError(400,"Not found")
     }
    res.status(200).json({message:"contact deleted"});
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    const {error} = checkingSchema.validate(req.body);
    if (error) {
      throw RequestError(400,"missing fields")
    }
    // const result = await contacts.addContact(req.body);
    // res.status(201).json(result)
    const {contactId} = req.params;
    const result = 
    await contacts.updateContact(contactId,req.body);
    res.json(result);
  } catch (error) {
    next(error)
  } 
})

module.exports = router
