const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controller/contactController");
const express = require("express");
const router = express.Router();

const {
  userRegister,
  logIn,
  getUserDetails,
  logOutUser,
} = require("../../controller/userController");
const auth = require("../../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Sign up
router.post("/users/register", userRegister);

// Sign in
router.post("/users/signin", logIn);

// User info
router.get("/users/current", auth, getUserDetails);

// Log out
router.get("/users/logout", auth, logOutUser);

// Get contacts
router.get("/contacts", auth, listContacts);

// Get contacts by id
router.get("/contacts/:contactId", auth, getContactById);

// Add contact
router.post("/contacts", auth, addContact);

// Remove contact
router.delete("/contacts/:contactId", auth, removeContact);

// Update contact
router.put("/contacts/:contactId", auth, updateContact);

// Update status
router.patch("/contacts/:contactId/favorite", auth, updateStatusContact);

module.exports = router;
