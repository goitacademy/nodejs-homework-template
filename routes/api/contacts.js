const express = require("express");
const router = express.Router();
const {
  addContact,
  getAll,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");

router.get("/", getAll);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.put("/:contactId", updateContact);

router.patch("/:id/favorite", updateStatusContact);

router.delete("/:contactId", removeContact);

module.exports = router;
