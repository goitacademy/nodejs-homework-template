const express = require("express");
const router = express.Router();
const CtrlWrapper = require("../../helpers/ctrlWrapper");
const ctrl = require("../../controllers");
const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/contact");

router.get("/", CtrlWrapper(ctrl.getContacts));

router.get("/:contactId", CtrlWrapper(ctrl.contactById));

router.post(
  "/",
  validateBody(schemas.addContactSchema),
  CtrlWrapper(ctrl.newContact)
);

router.delete("/:contactId", CtrlWrapper(ctrl.deleteContact));

router.put("/:contactId", CtrlWrapper(ctrl.updateContact));

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  CtrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
