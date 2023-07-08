const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const express = require("express");
const Joi = require("joi");
const uniqid = require('uniqid'); 

const schemaPost = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string()
    .pattern(/^(?:\+38)?0\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid phone number format",
      "any.required": "Phone number is required",
    }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const schemaPut = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),

  phone: Joi.string()
    .pattern(/^(?:\+38)?0\d{9}$/)
   
    .messages({
      "string.pattern.base": "Invalid phone number format",
      "any.required": "Phone number is required",
    }),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});
const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200).json(contacts)
});

router.get('/:contactId', async (req, res, next) => {
  try{
  const contact = await getContactById(req.params.contactId)
  res.status(200).json(contact)}
  catch (err) {
  res.status(404).json({ message: "Contact not found" })
  }
});

router.post('/', async (req, res, next) => {
 try{
  const {name, email, phone} = req.body;
  if(!name||!email|| !phone) {
    throw new Error ("missing required name field");
  }
const result = schemaPost.validate({name, email, phone});
if (result.error) {
  throw new Error(`${result.error.message}`);
} else {
  console.log("Phone number is valid");
}
const id = uniqid.time();
    const newContact = { id, name, email, phone };
    await addContact(newContact);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
 }
})

router.delete("/:contactId", async (req, res, next) => {
  
  try {
    const newArr = await removeContact(req.params.contactId);
    console.log(newArr);
    res.status(200).json({message: "contact deleted"});
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    if(Object.keys(req.body).length ===0)
    return res.status(400).json({ message: "missing fields" });
    const result = schemaPut.validate({...req.body});
    if (result.error) {
      throw new Error (`${result.error.message}`);}
      else {
        console.log("Phone number is valid");
      }
      const updatedContact = await updateContact(req.params.contactId, req.body);
      res.status(200).json(updatedContact)
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
})

module.exports = router
