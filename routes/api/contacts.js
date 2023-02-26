const express = require("express");
const joi = require("joi");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../utils");
const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(addSchema), ctrl.updateContact);

module.exports = router;
