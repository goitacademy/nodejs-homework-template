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
const { contactsAddSchema, updateFavoriteSchema } = require("../../models");
const isValidId = require("../../middlewares/validateId");

const router = express.Router();

router.get("/", getAll);
router.get("/:contactId", isValidId, getContactById);
router.post("/", validateContactsBody(contactsAddSchema), addContact);
router.delete("/:contactId", isValidId, removeContact);
router.put(
   "/:contactId",
   isValidId,
   validateContactsBody(contactsAddSchema),
   updateContact
);
router.patch(
   "/:contactId/favorite",
   isValidId,
   validateContactsBody(updateFavoriteSchema),
   updateStatusContact
);

module.exports = router;
