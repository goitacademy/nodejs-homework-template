const express = require("express");


const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../routes/api/helpers");

const { validateBody, validateParams } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get(
  "/:contactId",
  validateParams(schemas.contactIdSchema),
  ctrlWrapper(ctrl.getContactById)
);

router.post(
  "/",
  validateBody(schemas.contactSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete(
  "/:contactId",
  validateParams(schemas.contactIdSchema),
  ctrlWrapper(ctrl.removeContact)
);

router.put(
  "/:contactId",
  validateParams(schemas.contactIdSchema),
  validateBody(schemas.contactSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;