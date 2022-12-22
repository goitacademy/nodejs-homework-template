const express = require("express");
const router = express.Router();
const {
  createContactSchema,
  updateContactFavoriteSchema,
} = require("../../middlewares/contactSchema");
const validateSchema = require("../../middlewares/validateSchemaRequest");
const isValidId = require("../../middlewares/isValidId");

const {
  getContacts,
  getContactId,
  deleteContact,
  postContact,
  putContact,
  patchContact,
} = require("../../controllers/contactsController.js");

router.get("/", getContacts);
router.get("/:contactId", isValidId, getContactId);
router.post("/", validateSchema(createContactSchema), postContact);
router.delete("/:contactId", isValidId, deleteContact);
router.put("/:contactId", isValidId, putContact);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateSchema(updateContactFavoriteSchema),
  patchContact
);

module.exports = router;
