const express = require("express");

const {
  getContact,
  findContact,
  createContact,
  deleteContact,
  removeContact,
} = require("../../controllers/contactController");

const router = express.Router();
router.use((req, res, next) => {
  console.log("in contacts");
  next();
});

router.get("/api/contacts", getContact);
router.get("/:contactId", findContact);
router.post("/api/contacts", createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", removeContact);

module.exports = router;
