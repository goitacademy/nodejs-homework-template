const express = require("express");
const { validateCreate, validateUpdate, validateId } = require("./validation");
const {
  getContacts,
  getContactById,
  addContact,
  editContact,
  deleteContact,
} = require("../../modules/routerFunc");
const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", validateId, getContactById);
router.post("/", validateCreate, addContact);
router.put("/:contactId", validateUpdate, validateId, editContact);
router.delete("/:contactId", validateId, deleteContact);

module.exports = router;
