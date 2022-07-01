const express = require('express');
const createError = require("http-errors");
const router = express.Router();

const { addContactsValidation, putContactsValidation } = require("../../middlewares/joiValidation");
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


router.post('/', addContactsValidation, async (req, res, next) => {
  try {
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


router.put('/:id', putContactsValidation, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
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