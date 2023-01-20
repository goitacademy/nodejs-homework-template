const express = require("express");
const router = express.Router();

const {
  addPostValidation,
  patchPostValidation,
} = require("../../middlewares/validationMiddleware");
const {
  getContacts,
  getContact,
  addNewContact,
  deleteContact,
  updateContactById,
} = require("../../controllers/contactsContoller");

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", addPostValidation, addNewContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", patchPostValidation, updateContactById);

module.exports = router;
