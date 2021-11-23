/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(contactSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.patch(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(ctrl.updateContactById)
);

module.exports = router;
