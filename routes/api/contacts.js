const express = require("express");

const { isValidId } = require("../../validation/isValidate");
const {
  getAllContact,
  getOneContact,
  newContact,
  deleteContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contactControllers");

const router = express.Router();

router.get("/", getAllContact);

router.get("/:contactId", isValidId, getOneContact);

router.post("/", newContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put("/:contactId", isValidId, updateContact);

router.patch("/:contactId/favorite", isValidId, updateFavorite);

module.exports = router;
