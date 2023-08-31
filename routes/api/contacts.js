const express = require("express");
const Joi = require("joi");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", validateBody(addSchema), ctrl.deleteContact);

router.put("/:contactId", validateBody(addSchema), ctrl.updateContact);

module.exports = router;
