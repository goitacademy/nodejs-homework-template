const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");


const express = require('express')

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(10),
});

const validateInput = (contact) => {
  const validationResult = schema.validate(contact);
  return validationResult;
};

const router = express.Router()

router.get('/', async (req, res, next) => {
  
  const response = await listContacts();
  res.json({status: 200, response})
})

router.get('/:contactId', async (req, res, next) => {
  const response = await getContactById(req.params.contactId);
  
  response === null
    ? res.json({ status: 404, message: "Not found!" })
    : res.json({status: 200, response})
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone)
    return res.json({ status: 400, message: "missing required name field" })
  
  const validationResault = validateInput({ name, email, phone })
  
  if (validationResault === undefined) { 
    const response = await addContact({ name, email, phone });
    return res.json({status: 201, response})
  }
  res.json({status:400, erorr: validationResault.erorr})
})

router.delete('/:contactId', async (req, res, next) => {
  
  const response = await removeContact(req.params.contactId)

  response === null
    ? res.json({ status: 404, message: "Not found!" })
    : res.json({ status: 200, response });

})

router.put('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const updatedContact = req.body;
  if (Object.keys(updatedContact).length === 0)
    return res.json({ message: "missing fields" });
  const validationResult = validateInput(updateContact);
  if (validationResult.error === undefined) { 

     const response = await updateContact(id, updatedContact);

    response === null
    ? res.json({ status: 404, message: "Not found!" })
    : res.json({ status: 200, response });
  }
res.json({ status: 400, error: validationResult.error });

})

module.exports = router;
