const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getSingleContact,
  addNewContact,
  deleteContact,
  setContact,
} = require("./../../controllers/contacts");

router.get("/", getAllContacts);
router.get("/:contactId", getSingleContact);
router.post("/", addNewContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", setContact);

module.exports = router;
