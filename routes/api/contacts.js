const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, authenticate } = require("../../middlewars");

const router = express.Router();

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, ctrl.deleteContact);

router.put("/:contactId", authenticate, ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  authenticate,
  ctrl.updateFavorite
);

module.exports = router;
