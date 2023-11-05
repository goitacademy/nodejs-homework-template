const express = require("express");

const {
  getAllContact,
  getOneContact,
  newContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contactControllers");

const router = express.Router();

router.get("/", getAllContact);

router.get("/:contactId", getOneContact);

router.post("/", newContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

module.exports = router;
