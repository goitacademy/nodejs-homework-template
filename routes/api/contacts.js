const express = require("express");

const ctrl = require("../../controllers/contacts");
const { isEmptyBody, validateBody } = require("../../middlewars");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.listContact);

router.get("/:contactId", ctrl.getContactById);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:id",
  isEmptyBody,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);
router.delete("/:id", ctrl.removeContact);
module.exports = router;
