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
const { authenticate } = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, getAllContact);

router.get("/:contactId", authenticate, isValidId, getOneContact);

router.post("/", authenticate, newContact);

router.delete("/:contactId", authenticate, isValidId, deleteContact);

router.put("/:contactId", authenticate, isValidId, updateContact);

router.patch("/:contactId/favorite", authenticate, isValidId, updateFavorite);

module.exports = router;
