const express = require("express");

const router = express.Router();
const Joi = require("joi");
const ctrl = require("../../controllers/contacts");

const addSchemaforPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const addSchemaforPut = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", ctrl.updateById);

module.exports = router;
