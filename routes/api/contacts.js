const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validation, validateId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { auth } = require("../../middlewares");

router.get("/", auth, ctrlWrapper(ctrl.getContacts));
router.get("/:contactId", auth, validateId, ctrlWrapper(ctrl.getContactById));
router.post("/", auth, validation(schemas.add), ctrlWrapper(ctrl.addContact));
router.delete("/:contactId", auth, validateId, ctrlWrapper(ctrl.deleteContact));
router.put(
  "/:contactId",
  auth,
  validateId,
  validation(schemas.add),
  ctrlWrapper(ctrl.changeContact)
);
router.patch(
  "/:contactId/favorite",
  auth,
  validateId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
