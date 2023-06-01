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

const router = express.Router();

router.get("/", getAll);
router.get("/:contactId", getContactById);
router.post("/", validateContactsBody(schemas.contactsAddSchema), addContact);
router.delete("/:contactId", removeContact);
router.put(
   "/:contactId",
   validateContactsBody(schemas.contactsAddSchema),
   updateContact
);
router.put(
   "/:contactId/favorite",
   validateContactsBody(schemas.updateFavoriteSchema),
   updateStatusContact
);

module.exports = router;
