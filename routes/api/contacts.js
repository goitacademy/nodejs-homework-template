const express = require("express");
const router = express.Router();

const contactsController = require("../../controllers");
const { isValidId, validateData, checkBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", contactsController.getContacts);

router.get("/:contactId", isValidId, contactsController.getContact);

router.post(
  "/",
  checkBody,
  validateData(schemas.addSchema),
  contactsController.addContact
);


router.delete("/:contactId", isValidId, contactsController.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  checkBody,
  validateData(schemas.addSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateData(schemas.updateFavoriteSchema),
  contactsController.updateFavorite,
);

module.exports = router;