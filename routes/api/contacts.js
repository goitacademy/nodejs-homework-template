const express = require("express");
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contacts");
// const Joi = require("joi");
// const contacts = require("../../models/contacts");
// const HttpError = require("../../helpers/HttpError");
const router = express.Router();

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateContact);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
