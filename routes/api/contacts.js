const express = require("express");
const Joi = require("joi");

const schemaContacts = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const router = express.Router();
const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router;
