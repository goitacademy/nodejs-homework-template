const express = require('express')
const ContactsFunc = require("../../models/contacts");
const router = express.Router();
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.string().pattern(/[0-9]{9}/),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "pl", "gov", "net"] },
  }),
});

router.get('/', async (req, res, next) => {
   res.status(200).json(JSON.parse(await ContactsFunc.listContacts()));
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  if (!contactId) return res.status(400).json({ message: "bad request" });
  res.status(200).json(await ContactsFunc.getContactById(contactId));
})

router.post('/', async (req, res, next) => {
   const { name, email, phone } = req.query;

  try {
    const validation = schema.validate({ name, email, phone });
    if (validation.error) {
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    }
    const response = await ContactsFunc.addContact(req.query);

    if (response === 1) {
      res.status(200).json(req.query);
    } else if (response === 2) {
      res.status(200).json({ message: "missing required name - field" });
    } else if (response === 3) {
      res
        .status(200)
        .json({ message: "sorry we have an error please try again later" });
    } else if (response === 4) {
      res
        .status(200)
        .json({ message: "You already have contact with this name" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.delete('/:contactId', async (req, res, next) => {
   const { contactId } = req.params;
  try {
    if (!contactId) return res.status(400).json({ message: "bad request" });
    const deleteReponse = await ContactsFunc.removeContact(contactId);
    if (deleteReponse) {
      res.status(200).json({ message: "Contact deleted" });
    } else {
      res.status(200).json({ message: "Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.put('/:contactId', async (req, res, next) => {
   const { contactId } = req.params;
  const { name, email, phone } = req.query;
  try {
    if (!contactId) return res.status(400).json({ message: "bad request" });
    const validation = schema.validate({ name, email, phone });
    if (validation.error) {
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    }

    const contactExists = await ContactsFunc.getContactById(contactId);
    if (!contactExists) {
      return res.status(400).json({ message: "Contact not found" });
    }

    const response = await ContactsFunc.updateContact(contactId, {
      name,
      email,
      phone,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

module.exports = router