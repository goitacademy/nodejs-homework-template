/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactJoiSchema, statusContactJoiSchema } = require("../../models");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(contactJoiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.patch(
  "/:contactId",
  validation(contactJoiSchema),
  ctrlWrapper(ctrl.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  validation(statusContactJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
