const { joiSchemas } = require("../../models/contactModel");
const { addContactSchema, updateContactSchema, favorContactSchema } =
  joiSchemas;

const express = require("express");
const router = express.Router();

const ctrlContacts = require("../../controllers/contacts");
const controlWrapper = require("../../helpers/controlWrapper");
const validate = require("../../middleware/validate");

router.get("/", controlWrapper(ctrlContacts.getAll));

router.get("/:contactId", controlWrapper(ctrlContacts.getById));

router.post("/", validate(addContactSchema), controlWrapper(ctrlContacts.add));

router.delete("/:contactId", controlWrapper(ctrlContacts.removeById));

router.patch(
  "/:contactId",
  validate(favorContactSchema),
  controlWrapper(ctrlContacts.updateStatusContact)
);

router.put(
  "/:contactId",
  validate(updateContactSchema),
  controlWrapper(ctrlContacts.updateById)
);

module.exports = router;
