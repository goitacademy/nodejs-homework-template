const express = require('express');

const contactsController = require("../../controllers/contacts-controllers");

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../decorators");

const { isValidId, authentificate, upload } = require("../../middlewares");

const router = express.Router();

router.use(authentificate);

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  upload.single("avatar"),
  validateBody(schemas.contactAddSchema),
  contactsController.postContact
);

router.delete("/:contactId", isValidId, contactsController.deleteContactById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.putContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateFavorite
);

module.exports = router;
