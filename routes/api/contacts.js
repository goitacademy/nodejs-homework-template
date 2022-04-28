const express = require('express');
const Joi = require("joi");

const { createError } = require("../../helpers");

const contacts = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})


router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch(error) {
    next(error);
  } 
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createError(404, "Not found")
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const { name, email, phone } = req.body;

    const result = await contacts.addContact( name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contacts.getContactById(id);
//     if (!result) {
//       throw createError(404, "Not found")
//     }
//     res.json({
//       message: "contact deleted"
//     });
//   } catch (error) {
//     next(error);
//   }
// })

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await contacts.updateById(contactId, name, email, phone);
    if (!result) {
      throw createError(404)
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
