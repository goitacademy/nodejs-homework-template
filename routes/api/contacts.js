const express = require('express');
// const Joi = require("joi");
const ctrl = require("../../controllers/contacts")

// const contacts = require("../../models/contacts")

// const {HttpError} = require("../../helpers")

const router = express.Router()

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// })

router.get("/", ctrl.listContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', ctrl.addContact);

router.put('/:id', ctrl.updateContact);

router.delete('/:id', ctrl.removeContact);


module.exports = router;
