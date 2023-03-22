const express = require("express");
const router = express.Router();
const CtrlWrapper = require("../../helpers/ctrlWrapper");
const ctrl = require("../../controllers");
const validateBody = require("../../middlewares/validateBody");
const authorization = require("../../middlewares/authentificate");
const { schemas } = require("../../models/contact");

router.get("/", authorization, CtrlWrapper(ctrl.getContacts));

router.get("/:contactId", authorization, CtrlWrapper(ctrl.contactById));

router.post(
  "/",
  authorization,
  validateBody(schemas.addContactSchema),
  CtrlWrapper(ctrl.newContact)
);

router.delete("/:contactId", authorization, CtrlWrapper(ctrl.deleteContact));

router.put("/:contactId", authorization, CtrlWrapper(ctrl.updateContact));

router.patch(
  "/:contactId/favorite",
  authorization,
  validateBody(schemas.updateFavoriteSchema),
  CtrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
