const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");
const {
  validatePostContact,
  validatePutContact,
  validatePatchContact,
} = require("../../models/validateContacts");
const {
  contactSchema,
  contactPatchSchema,
} = require("../../models/contactsSchema");
const checkValidId = require("../../middleware/checkValidId");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, listContacts);

router.get(`/:id`, authMiddleware, checkValidId, getContactById);

router.post(
  "/",
  authMiddleware,
  validatePostContact(contactSchema),
  addContact
);

router.delete("/:id", authMiddleware, removeContact);

router.put("/:id", authMiddleware);
router.get(`/:id`, checkValidId, getContactById);
router.post("/", validatePostContact(contactSchema), addContact);

router.delete("/:id", checkValidId, removeContact);

router.put(
  "/:id",
  checkValidId,
  validatePutContact(contactSchema),
  updateContact
);

router.patch(
  "/:id/favorite",
  authMiddleware,
  checkValidId,
  validatePatchContact(contactPatchSchema),
  updateStatusContact
);

module.exports = router;
