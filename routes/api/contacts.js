const express = require("express");
const { addValidation, addFavValidation, auth } = require("../../middlewares");
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

router.get("/", auth, asyncHandler(getContacts));

router.get("/:contactId", auth, asyncHandler(getContactById));

router.post("/", auth, addValidation, asyncHandler(addContact));

router.delete("/:contactId", auth, asyncHandler(removeContact));

router.put("/:contactId", auth, addValidation, asyncHandler(updateContact));

router.patch(
  "/:contactId/favorite",
  auth,
  addFavValidation,
  asyncHandler(updateFavorite)
);

module.exports = router;
