const express = require("express");
const contactsController = require("../../controllers/contacts");
const router = express.Router();
const { validateBody } = require("../../utils/validateBody");
const { schemas } = require("../../models/contacts");
const { isValidId, authenticate, upload } = require("../../middlewares");

router.use(authenticate);

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  upload.single("avatar"),
  validateBody(schemas.contactAddSchema),
  contactsController.addNewContact
);

router.delete("/:contactId", isValidId, contactsController.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactUpdateSchema),
  contactsController.editContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.contactUpdateFavoriteSchema),
  contactsController.editFavoriteField
);

module.exports = router;
