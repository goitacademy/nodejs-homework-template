const express = require('express');
const createError = require("http-errors");
const joi = require('joi');
const router = express.Router();

const contacts = require("../../models/contacts");


router.get('/', async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.json({ data, status: 200 });
  }
  catch (err) {
    next(err);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await contacts.getContactById(id);
    if (!data) {
      const error = createError(404, "Not found");
      throw error;
    }
    res.json({ data, status: 200 });
  }
  catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const schema = joi.object({
      name: joi.string()
        .min(2)
        .max(30)
        .required(),
      email: joi.string()
        .min(5)
        .max(50)
        .required(),
      phone: joi.string()
        .min(8)
        .max(16)
        .required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      console.log(validationResult.error)
      return res.json({ message: "missing required name field", status: 400 });
    }

    const { name, email, phone } = req.body;
    const data = await contacts.addContact(name, email, phone);
    res.json({ data, status: 201 });
  }
  catch (err) {
    next(err);
  }
})


router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await contacts.removeContact(id);
    if (!data) {
      const error = createError(404, "Not found");
      throw error;
    }
    res.json({ message: "Contact deleted", status: 200 })
  }
  catch (err) {
    next(err);
  }
});


router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.json({ message: "missing fields", status: 400 });
    }
    const data = await contacts.updateContact(id, name, email, phone);
    if (!data) {
      const error = createError(404, "Not found");
      throw error;
    }
    res.json({ data, status: 200 });
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;


// * Обработка ошибок без http-errors:
// * const error = new Error("Not found");
// * error.status = 404;
// * throw error;