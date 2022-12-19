const express = require('express')

const contacts = require("../../models/contacts")
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  id: Joi.any,
    phone: Joi.number().min(10)
})


const router = express.Router()

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts()
     res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
})



router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  res.json((contact===null)?{
    status: 'error',
    code: 404,
    message: "Not found"
  }:{
    status: 'success',
    code: 200,
    data:contact,
  });
})

router.post('/', async (req, res, next) => {

  try {
    const value = await schema.validateAsync(req.body);
    const {name, 
        email,
      phone } = value;
    const contact = await contacts.addContact({name, 
        email,
      phone
    });
     res.status(201).json({
    status: 'success',
    code: 201,
    data: {contact},
  });
}
  catch (err) {
    res.status(404).json({
     message: "Data is not valid"
  });
    
 }

})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.removeContact(contactId);
  res.json(contact? {
    status: 'success',
    code: 200,
    message: "contact deleted",
    data:contact,
  }:{
    status: 'success',
    code: 404,
    message: "Not found",
    data:contact,
  })
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const infoValue = await schema.validateAsync(req.body);
    const { contactId } = req.params;    
    const {name, 
        email,
        phone } = infoValue;
   const contact = await contacts.putContactById({contactId,name, email, phone});    
  res.json({
    status: 'success',
    code: 200,
    data: {contact},
  });
}
  catch (err) {
    res.status(404).json({
     message: "Data is not valid"
  });
    
 }
})

module.exports = router
