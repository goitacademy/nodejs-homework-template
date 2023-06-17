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
const passport = require("passport");
const { userRegister, logIn } = require("../../controller/userController");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// Sign up
router.post("/users/register", userRegister);

// Sign in
router.post("/users/signin", logIn);

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
