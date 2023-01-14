const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../controllers/cont.controllers");

router
  .get("/", listContacts)
  .get("/:id", getContactById)
  .post("/", addContact)
  .delete("/:id", removeContact)
  .put("/:id", updateContact);

module.exports = router;
