const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  addNewContact,
  getOneContact,
  removeOneContact,
  updateOneContact,
  updateFavorite,
} = require("../../controllers/contactsController");


router.get("/", getAllContacts);

router.get("/:contactId", getOneContact);

router.post("/", addNewContact);

router.delete("/:contactId", removeOneContact);

router.put("/:contactId", updateOneContact);

router.patch("/:contactId", updateFavorite);

module.exports = router;
