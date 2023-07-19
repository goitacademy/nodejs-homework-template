const express = require("express");
const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenicate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenicate, ctrl.getAllContacts);

router.get("/:contactId", authenicate, isValidId, ctrl.getContactById);

router.post("/", authenicate, validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  authenicate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.delete("/:contactId", authenicate, isValidId, ctrl.deleteContact);

router.patch(
  "/:contactId/favorite",
  authenicate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
