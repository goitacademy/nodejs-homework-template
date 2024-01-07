
const express = require('express')
// const fs = require("node:fs/promises");
// const path = require("node:path");
const router = express.Router()
const Contacts = require("../../models/contacts");
const jsonParser = express.json();

router.get('/', async (req, res, next) => {
 const result = await Contacts.listContacts();
  res.status(200).json(result);
  console.log(res.statusCode);
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
   const result = await Contacts.getContactById(contactId);

   if (result === undefined) {
    res.status(404).send("Error 404! Not found");
   }
   res.status(200).json(result);
   
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
  
})

router.post('/', jsonParser, async (req, res, next) => {
  // const { name, email, phone } = req.params;
  res.json({ message: 'template message' })
  console.log(req.body);
  // try {
  //   const result = await Contacts.addContact(req.body);
 
    // if (result === undefined) {
    //  res.status(404).send("Error 404! Not found");
    // }
  //   res.status(200).json(result);
    
  //  } catch (error) {
  //    console.error(error);
  //    res.status(500).send("Internal Server Error");
  //  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
   const result = await Contacts.removeContact(contactId);

   if (result === undefined) {
    res.status(404).send("Error 404! No contatc with such id found");
   }
   res.status(200).json(result);
   console.log(result);
   
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
  
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
