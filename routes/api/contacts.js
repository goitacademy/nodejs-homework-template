const express = require("express");
const { addValidation, addFavValidation } = require("../../middlevares");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../controllers");
const asyncHandler = require("express-async-handler");

const router = express.Router();

router.get("/", asyncHandler(getContacts));

router.get("/:contactId", asyncHandler(getContactById));

router.post("/", addValidation, asyncHandler(addContact));

router.delete("/:contactId", asyncHandler(removeContact));

router.put("/:contactId", addValidation, asyncHandler(updateContact));

router.patch(
  "/:contactId/favorite",
  addFavValidation,
  asyncHandler(updateFavorite)
);

module.exports = router;
