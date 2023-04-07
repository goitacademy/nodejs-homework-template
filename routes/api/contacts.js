const express = require("express");
// const createError = require("http-errors");
// const Joi = require("Joi");

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");
const { statusSchema } = require("../../models/contact");

// const contuctSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

// const contactsOperations = require("../../models");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateContact));

router.patch(
  "/:id/favorite",
  validation(statusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

//
module.exports = router;
