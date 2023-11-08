const express = require("express");
const router = express.Router();
const contacts = require("../controllers/contacts");

router.get("/contacts", contacts.getAllContacts);
router.get("/contacts/:id", contacts.getContact);
router.post("/contacts", contacts.createContact);
router.put("/contacts/:id", contacts.putContact);
// router.patch("/contacts/:id", contacts.patchContact);
router.patch("/contacts/:id/favorite", contacts.updateFavorite);
router.delete("/contacts/:id", contacts.deleteContact);

module.exports = router;
