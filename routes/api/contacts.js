const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:id",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:id/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
