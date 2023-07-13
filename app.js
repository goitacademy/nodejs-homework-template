const express = require("express");
const {
  getAllContacts,
  getById,
  deleteById,
  createContact,
  updateContact,
} = require("../../controllers/contacts");
const {
  validationCreatePost,
  validationUpdatePost,
} = require("../../middleware/validationMiddleware");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", validationCreatePost, createContact);

router.delete("/:contactId", deleteById);

router.put("/:contactId", validationUpdatePost, updateContact);

module.exports = router;