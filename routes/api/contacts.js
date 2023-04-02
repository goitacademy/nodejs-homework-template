const express = require("express");
const {
  getAll,
  getById,
  addNewContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactsControllers");
const router = express.Router();

// ========== Routers ==========

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", addNewContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

module.exports = router;
