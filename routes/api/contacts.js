const express = require("express");
// const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')
const createError = require("http-errors");
const Joi = require("joi");
const contactController = require("../../controllers/contacts");

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
});

router.get("/", contactController.get);

// router.get('/', async (req, res, next) => {
//   listContacts().then(response => res.json( response ))
// })

router.get("/:contactId", contactController.getOne);

// router.get("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   getContactById(contactId).then((response) => {
//     if (response) res.json(response);
//     else next(createError(404));
//   });
// });

router.post("/", contactController.post);

// router.post("/", async (req, res, next) => {
//   const { error, value } = schema.validate(req.body);
//   if (error) {
//     res.status(400).json({ message: error.message });
//   }
//   addContact(value);
//   res.sendStatus(201);
// });

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  removeContact(contactId).then((response) => {
    if (response) res.status(200).json({ message: "contact deleted" });
    else next(createError(404));
  });
});

router.put("/:contactId", async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;
  if (!body) res.status(400).json({ message: "missing fields" });
  else
    updateContact(contactId, body).then((response) => {
      if (response) res.status(200);
      else next(createError(404));
    });
});

module.exports = router;
