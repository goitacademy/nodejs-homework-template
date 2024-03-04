const express = require("express");
const router = express.Router();
const auth = require("../../controllers/auth");
const { middleware } = require("../../controllers/middleware");

const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contactsController");

const { avatars, upload } = require("../../controllers/avatars");

router.get("/", auth, getContacts);
router.get("/:contactId", auth, getContactById);
router.post("/",  createContact);
router.delete("/:contactId",  deleteContact);
router.put("/:contactId",  updateContact);
router.patch("../../controllers/avatars.js", middleware, upload.single("avatar"), avatars);

module.exports = router;
