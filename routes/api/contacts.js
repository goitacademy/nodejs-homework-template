const express = require("express");
const contactsControllers = require("./../../controllers/contacts-controller");

const isEmptyBody = require("../../middlewares/isEmptyBody.js");

const validateBody = require("../../decorators/validateBody.js");

const contactSchema = require("../../schemas/contact-schema.js");

const contactAddValidation = validateBody(contactSchema);

// const Joi = require("joi");

// const contactService = require("../../models/index.js");
// const HttpError = require("../../helpers/HttpError.js");

const router = express.Router();

// const contactSchema = Joi.object({
//   id: Joi.any(),
//   name: Joi.string().required().messages({
//     "any.required": `missing required field "title"`,
//   }),
//   email: Joi.string().required().messages({
//     "any.required": `missing required field "email"`,
//   }),
//   phone: Joi.number().required().messages({
//     "any.required": `missing required field "phone"`,
//   }),
// });

router.get("/", contactsControllers.getAll);

router.get("/:id", contactsControllers.getById);

router.post("/", isEmptyBody, contactAddValidation, contactsControllers.post);

router.put(
  "/:contactId",
  isEmptyBody,
  contactAddValidation,
  contactsControllers.updateById
);

router.delete("/:contactId", contactsControllers.deleteById);

module.exports = router;
