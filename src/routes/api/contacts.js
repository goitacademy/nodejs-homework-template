const express = require("express");
const router = express.Router();
const {
  addPostValidation,
  putPostValidation, patchPostValidation,
} = require("../../middlewares/validationMiddleware.js");
const {
  getContacts,
  getContactId,
  deleteContact,
  postContact,
  putContact,
  patchContact,
} = require("../../controllers/contactsController.js");
const { isValidId } = require("../../middlewares/isValidId");

router.get("/", getContacts);
router.get("/:contactId",isValidId, getContactId);
router.post("/", addPostValidation, postContact);
router.delete("/:contactId", isValidId, deleteContact);
router.put("/:contactId", isValidId, putPostValidation, putContact);
router.patch("/:contactId/favorite", isValidId, patchPostValidation, patchContact);

module.exports = router;
