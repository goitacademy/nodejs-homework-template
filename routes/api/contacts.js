const express = require("express");
const Joi = require("joi");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const router = express.Router();

router.get("/", ctrl.getContactList);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateBody(addSchema), ctrl.updateContact);

module.exports = router;
