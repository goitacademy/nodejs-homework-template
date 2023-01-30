const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  newContact,
  putContact,
  deleteContact,
  setFavorite,
} = require("../../controllers/contactsController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { contactValidation } = require("../../middleware/validationMiddleware");

router.get("/", asyncWrapper(getContacts));

router.get("/:contactId", asyncWrapper(getContact));

router.post("/", contactValidation, asyncWrapper(newContact));

router.put("/:contactId", contactValidation, asyncWrapper(putContact));

router.delete("/:contactId", asyncWrapper(deleteContact));

router.patch("/:contactId/favorite", asyncWrapper(setFavorite));

module.exports = router;
