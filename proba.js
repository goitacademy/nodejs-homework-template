// service\schemas\contactSchema.js

const Joi = require('joi');
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const validateContact = (contact) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().strict(),
  });

  return schema.validate(contact, { abortEarly: false });
};

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  Contact: mongoose.model('Contact', contactSchema),
  validateContact,
  updateFavoriteSchema,
};


// --routes\api\contacts.js
const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/index");
const  validateId  = require("../../middlewares/validateId");
const {validateBody}  = require("../../middlewares/validator");
const { contactSchema, updateFavoriteSchema } = require("../../service/schemas/contactSchema");

router.get("/", ctrl.getContacts);
router.get("/:id", validateId, ctrl.getContact);
router.post("/", validateBody(contactSchema), ctrl.createContact);
router.delete("/:id", validateId, ctrl.deleteContact);
router.put("/:id", validateId, validateBody(contactSchema), ctrl.updateContact);
router.patch("/:id/favorite", validateId, validateBody(updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
