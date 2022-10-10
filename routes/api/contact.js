const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middelwares");
const { schemas } = require("../../models/contacts");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.addNewContact)
);

router.delete("/:id", ctrlWrapper(ctrl.removeContactById));

router.patch(
  "/:id/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.put(
  "/:id",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContactById)
);

module.exports = router;
