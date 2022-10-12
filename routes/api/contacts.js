const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const ctrl = require("../../controllers/contacts");
const isValidId = require("../../middlewares/isValidId");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", ctrlWrapper(ctrl.addContact));

router.put("/:contactId", isValidId, ctrlWrapper(ctrl.updateContact));

router.patch(
  "/:contactId/favorite",
  isValidId,
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
