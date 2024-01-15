
const express = require('express')
const router = express.Router()
const Contacts = require("../../models/contacts");
const jsonParser = express.json();

const Joi = require('joi');
 const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
 });

router.get('/', async (req, res, next) => {
 const result = await Contacts.listContacts();
  res.status(200).json(result);
  console.log(res.statusCode);
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
   const result = await Contacts.getContactById(id);

   if (result === undefined) {
    res.status(404).json({message: "Not found"});
   }
   res.status(200).json(result);
   
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
  
})

router.post('/', jsonParser, async (req, res, next) => {
 
  try {
    const {error} = addSchema.validate(req.body);
    console.log(error);
    if (error) {
      res.status(400).json({ message: 'missing required name field' });
    }
    if (!error) {
      const result = await Contacts.addContact(req.body);
      res.status(201).json(result); }
    
   } catch (error) {
     console.error(error);
     res.status(500).send("Internal Server Error");
   }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
   const result = await Contacts.removeContact(id);

   if (!result) {
    res.status(404).json({"message": "Not found"});
   }
   if (result) {
    res.status(200).json({"message": "contact deleted"});
   }
   
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
  
})

router.put('/:id', async (req, res, next) => {

  try {
    const {error} = addSchema.validate(req.body);
    console.log(error);
    if (error) {
      res.status(400).json({ message: 'missing required name field' });
    }
    if (!error) {
      const { id } = req.params;
    const result = await Contacts.updateContact(id, req.body);
    if (!result) {
      res.status(404).json({message: "Not found"});
     }
     if (result) {
     res.status(200).json(result);}
    }
    
    
   } catch (error) {
     console.error(error);
     res.status(500).send("Internal Server Error");
   }
})

module.exports = router
