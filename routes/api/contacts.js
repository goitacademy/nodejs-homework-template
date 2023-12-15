const express = require("express");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

const { validateBody, isValidId } = require('../../middlewares');

const {schemas} = require('../../models/contact')

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:contactId", isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

// router.delete("/:contactId", isValidId, ctrl.deleteContact);

module.exports = router;
