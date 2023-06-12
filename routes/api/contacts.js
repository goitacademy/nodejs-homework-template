const express = require("express");

const contactsControllers = require("../../controllers/contactsControllers");

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../decorators");

const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.use(authenticate);

router.get("/", contactsControllers.listContacts);

router.get("/:id", isValidId, contactsControllers.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsControllers.addContact
);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.contactUpdateSchema),
  validateBody(schemas.contactAddSchema),
  contactsControllers.updateContactById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.contactUpdateFavoriteSchema),
  contactsControllers.updateStatusContact
);

router.delete("/:id", isValidId, contactsControllers.removeContact);

module.exports = router;
