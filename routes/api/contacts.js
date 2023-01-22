const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  editContact,
  deleteContact,
} = require("../../modules/routerFunc");
const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContactById);
router.post("/", addContact);
router.put("/:contactId", editContact);
router.delete("/:contactId", deleteContact);

module.exports = router;
