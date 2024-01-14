const express = require("express");

const contactsControllers = require("../../controllers/contacts");
const { validateBody } = require("../../decorators");
const { contactsSchema } = require("../../validators");
const { isValidMongoId, authorization } = require("../../middlewares");

const router = express.Router();

router.use(authorization);

router.get("/", contactsControllers.listContacts);
router.post(
  "/",
  validateBody(contactsSchema.createContactsSchema),
  contactsControllers.addContact
);

router.get("/:id", isValidMongoId, contactsControllers.getContactById);
router.delete("/:id", isValidMongoId, contactsControllers.removeContact);
router.put(
  "/:id",
  isValidMongoId,
  validateBody(contactsSchema.createContactsSchema),
  contactsControllers.updateContact
);
router.patch(
  "/:id/favorite",
  isValidMongoId,
  validateBody(contactsSchema.updateFavorite),
  contactsControllers.updateFavorite
);

module.exports = router;
