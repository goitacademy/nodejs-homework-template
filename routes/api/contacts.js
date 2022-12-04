const express = require("express");

const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { contactSchema } = require("../../schemas/contacts");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(contactSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validateBody(contactSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
