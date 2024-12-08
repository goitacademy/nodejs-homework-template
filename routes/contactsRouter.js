const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContact,
  addContact,
  removeContact,
  putContact,
  patchContact,
} = require("../controllers/contacts");

router.get("/", getAllContacts);
router.get("/:contactId", getContact);
router.post("/", addContact);
router.put("/:contactId", putContact);
router.patch("/:contactId/favorite", patchContact);
router.delete("/:contactId", removeContact);

module.exports = router;
