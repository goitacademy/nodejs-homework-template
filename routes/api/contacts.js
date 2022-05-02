const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validation, validateId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getContacts));
router.get("/:contactId", validateId, ctrlWrapper(ctrl.getContactById));
router.post("/", validation(schemas.add), ctrlWrapper(ctrl.addContact));
router.delete("/:contactId", validateId, ctrlWrapper(ctrl.deleteContact));
router.put(
  "/:contactId",
  validateId,
  validation(schemas.add),
  ctrlWrapper(ctrl.changeContact)
);
router.patch(
  "/:contactId/favorite",
  validateId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
