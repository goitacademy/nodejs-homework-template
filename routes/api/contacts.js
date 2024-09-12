const express = require("express");
const {
  getContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateStatus,
} = require("../../controllers/index");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", updateStatus);

module.exports = router;
