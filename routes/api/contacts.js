const express = require("express");
const {
   getAll,
   getContactById,
   addContact,
   removeContact,
   updateContact,
   updateStatusContact,
} = require("../../controllers/contacts");
const { validateContactsBody } = require("../../middlewares");
const { schemas } = require("../../models/contacts");
const isValidId = require("../../middlewares/validateId");

const router = express.Router();

router.get("/", getAll);
router.get("/:contactId", isValidId, getContactById);
router.post("/", validateContactsBody(schemas.contactsAddSchema), addContact);
router.delete("/:contactId", isValidId, removeContact);
router.put(
   "/:contactId",
   isValidId,
   validateContactsBody(schemas.contactsAddSchema),
   updateContact
);
router.patch(
   "/:contactId/favorite",
   isValidId,
   validateContactsBody(schemas.updateFavoriteSchema),
   updateStatusContact
);

module.exports = router;
