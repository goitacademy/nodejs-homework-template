const express = require('express')
const Joi = require('joi');

const contactsOptions = require("../../models/contacts")

const contactsSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().required()
})



const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOptions.listContacts();
    //   console.log(contactId)
    return res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    });
  } catch (error) {
    next(error)
    
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOptions.get(contactId);
    if (!result) {
      return res.status(404).json({
        status: "error",
        code: 404,
        massage: `Contacts with id = ${contactId} not found`
      })
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        data: result
      }
    });

  } catch (error) {
    next(error)

  }
  
})

router.post('/', async (req, res, next) => {
  console.log(req.body)
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 404;
       throw error;
    }
    const result = await contactsOptions.addContact(req.body);
    // console.log(result)
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: result,
      }
    })
  } catch (error) {
    next(error);
  }

})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log({ contactId })
    const result = await contactsOptions.removeContact(contactId);
    if (!result) {
      return res.status(404).json({
        status: "error",
        code: 404,
        massage: `Contacts with id = ${contactId} not found`
      })
    }
    return res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        data: result
      }
    })
  } catch (error) {

  }
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updateContact = await contactsOptions.updateContact(contactId, req.body);
    if (!updateContact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        massage: `Contacts with id = ${contactId} not found`
      })
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        data: updateContact
      }
    })

  } catch (error) {
    next(error);

  }
})

module.exports = router
