const express = require('express')

const contactMethods = require("../../models/contacts");

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const result = await contactMethods.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
   try {
     const result = await contactMethods.getContactById();
     res.json(result);
   } catch (error) {
     next(error);
   }
})

router.post('/', async (req, res, next) => {
   try {
     const result = await contactMethods.addContact();
     res.json(result);
   } catch (error) {
     next(error);
   }
})

router.delete('/:contactId', async (req, res, next) => {
   try {
     const result = await contactMethods.removeContact();
     res.json(result);
   } catch (error) {
     next(error);
   }
})

router.put('/:contactId', async (req, res, next) => {
   try {
     const result = await contactMethods.updateContact();
     res.json(result);
   } catch (error) {
     next(error);
   }
})

module.exports = router
