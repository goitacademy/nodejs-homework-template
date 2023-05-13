const express = require("express");

const {
  getAllMovies,
  getById,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contacts-controller");

const router = express.Router();

router.get("/", getAllMovies);

router.get("/:contactId", getById);

router.post("/", addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

module.exports = router;
