const express = require("express");
const router = new express.Router();

const { contactValidator } = require("../middlewares/validation");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateFavoriteController,
} = require("../controllers/contactsController");

router.use(authMiddleware);
router.get("/", asyncWrapper(getContactsController));
router.get("/:contactId", asyncWrapper(getContactByIdController));
router.post("/", contactValidator, asyncWrapper(addContactController));
router.delete("/:contactId", asyncWrapper(deleteContactController));
router.put(
  "/:contactId",
  contactValidator,
  asyncWrapper(updateContactController)
);
router.patch("/:contactId/favorite", asyncWrapper(updateFavoriteController));

module.exports = router;
