const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const ctrlWrapper = require("../../helpers/ctrlWrapper");

const { validateContact } = require("../../middlewares");

const { addSchema } = require("../../schemas/contacts");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateContact(addSchema), ctrlWrapper(ctrl.addContacts));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  validateContact(addSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
