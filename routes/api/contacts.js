const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contact");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.removeContact)
);

router.put("/:contactId", ctrlWrapper(ctrl.updateContact));

module.exports = router;
ctrlWrapper();
