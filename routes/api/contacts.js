const express = require('express')
const Joi = require('joi');
const contacts = require('../../models/contacts');

const { RequestError } = require('../../helpers');

const router = express.Router()

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
})



router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
  res.json(result)
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   message:'Server error'
    // })
  }
  
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw RequestError(404, 'Not found');


      // res.status(404).json({
      //   message: "Not found"
      // });
      // return;
    }
    res.json(result);


  } catch (error) {
    next(error);
    // const { status = 500, message = 'Server error' } = error;
    // res.status(status).json({
    //   message,
    // })
  }
  // res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  
  try {
    const { error } = contactSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw RequestError(400, "missing required name field");
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
  // res.json({ message: 'template message' })
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({
      message: "contact deleted"
    })
  } catch (error) {
    next(error);
  }
  // res.json({ message: 'template message' })
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields")
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw RequestError(404, "Not found")
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
  // res.json({ message: 'template message' })
})

module.exports = router
