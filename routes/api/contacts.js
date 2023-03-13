const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const  ctrl  = require("../../controllers/contacts");
const { validation, authenticate, isValidId } = require("../../middlewares");
const { contactSchemaJoi, favoriteSchemaJoi } = require('../../models');

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getListContacts));
router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getContact));
router.post("/", authenticate, validation(contactSchemaJoi), ctrlWrapper(ctrl.createContact));
router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteContact));
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(contactSchemaJoi),
  ctrlWrapper(ctrl.updateContactById)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validation(favoriteSchemaJoi),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
