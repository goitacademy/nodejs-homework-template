const express = require('express');
const Joi = require("joi");
const contacts = require("../../models/contacts");

const{HttpError} = require("../../helpers");

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try{
    const result = await contacts.listContacts();
    res.json(result);
  }
  catch(error){
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try{
    const{contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result){
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
  catch(error){
    next(error)
  }
  
})


router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
     if(error) {
      throw HttpError(400, "missing required name field");
     }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
  catch(error) {
    next(error);
  }
})



router.put("/:contactId", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .optional(),
    phone: Joi.string().min(7).max(20).optional(),
  });
  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details });
    return;
  }
  if (Object.keys(value).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const { contactId } = req.params;
  const response = await contacts.updateContact(contactId, value);

  if (!response) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(response);
});


router.delete('/:contactId', async (req, res, next) => {
 try {
  const {contactId} = req.params;
  const result = await contacts.removeContact(contactId);
  if(!result){
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted"
  })
 }
 catch(error) {
  next(error);
 }
})

module.exports = router