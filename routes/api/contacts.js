const express = require("express");

const router = express.Router();

const contactsControllers = require("../../controllers/contacts-controllers");

const schems = require("../../schems/schem-contacts");

const { validateBody } = require("../../decorators/validateBody");
const { isValidId } = require("../../middlewares");

router.get("/", contactsControllers.getAllContacts);

router.get("/:id", isValidId, contactsControllers.getContactId);

router.post(
  "/",
  validateBody(schems.addSchema),
  contactsControllers.addContact
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schems.contactUpdateFavoriteSchema),
  contactsControllers.updateFavorite
);

router.delete("/:id", isValidId, contactsControllers.removeContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schems.addSchema),
  contactsControllers.updateContact
);

module.exports = router;
