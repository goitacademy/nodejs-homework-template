const express = require("express");
const {
  addValid,
  updateValid,
  updateFavoriteValid,
} = require("../../middlewares/contactsValidation");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");
const userVerification = require("../../middlewares/userVerification");
const contactsCtrl = require("../../controllers/contacts.js");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  console.log("GET /contacts route hit");
  contactsCtrl.listContactsForUser(req, res);
});

router.get("/:contactId", authenticate, isValidId, (req, res) => {
  console.log("GET /contacts/:contactId route hit");
  contactsCtrl.getContactById(req, res);
});

router.post("/", authenticate, addValid, (req, res) => {
  console.log("POST /contacts route hit");
  contactsCtrl.addContact(req, res);
});

router.delete("/:contactId", authenticate, userVerification, isValidId, (req, res) => {
  console.log("DELETE /contacts/:contactId route hit");
  contactsCtrl.removeContact(req, res);
});

router.put("/:contactId", authenticate, userVerification, isValidId, updateValid, (req, res) => {
  console.log("PUT /contacts/:contactId route hit");
  contactsCtrl.updateContact(req, res);
});

router.patch("/:contactId/favorite", authenticate, userVerification, isValidId, updateFavoriteValid, (req, res) => {
  console.log("PATCH /contacts/:contactId/favorite route hit");
  contactsCtrl.updateStatusContact(req, res);
});

module.exports = router;


