const express = require("express");

const router = express.Router();
const {
  getAll,
  getById,
  addContact,
  deleteContact,
  update,
  updateStatusContact
} = require("../../controllers/contacts");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", update);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;

