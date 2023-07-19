const express = require('express');
const router = express.Router();
const Joi = require('joi');

const contactsFunction = require("../../models/contacts");
const { HttpError } = require("../../helpers")

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number().required(),
})



router.get("/", async (req, res, next) => {
  try {
     const allContacts = await contactsFunction.listContacts();
  res.status(200).json(allContacts);
  }
   catch (error) {
    next(error)
}
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactID = await contactsFunction.getContactById(id);
    if (!contactID) {
      throw HttpError(404, 'Not found id');
    }
    res.status(200).json(contactID)
  }
  catch (error) {
    next(error)
}
});
router.post("/", async (req, res, next) => {
  try {
     const { name, email, phone } = req.body;
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field")
    }   
    const newContact = await contactsFunction.addContact({ name, email, phone });
        if (!newContact) {
      throw HttpError(404, 'Not found id');
    }
    res.status(201).json(newContact)
  }
  catch (error) {
       next(error)
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
    const contactID = await contactsFunction.removeContact(id);
    if (!contactID) {
      throw HttpError(404, 'Not found id');
    }
    res.status(200).json(contactID)
  }
  catch (error) {
       next(error)
  }
});
router.put("/:id", async (req, res, next) => {
  try {
      const { id } = req.params;
    const { name, email, phone } = req.body;
     const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields")
    }   
    const contactID = await contactsFunction.updateContact(id, { name, email, phone });
     if (!contactID) {
      throw HttpError(404, 'Not found id');
    }
    res.status(200).json(contactID)
  }
    catch (error) {
       next(error)
  }
});


module.exports = router



// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

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