const express = require("express");
const router = express.Router();

const {
  contactsValidation,
  favoriteValidation,
} = require("../middlewares/validationMiddleware");

const { asyncWrapper } = require("../helpers/apiHelpers");
const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  favoriteContactController,
} = require("../controllers/contactsController");

router.get("/", asyncWrapper(listContactsController));

router.get("/:id", asyncWrapper(getContactByIdController));

router.post("/", contactsValidation, asyncWrapper(addContactController));

router.delete("/:id", asyncWrapper(removeContactController));

router.put("/:id", contactsValidation, asyncWrapper(updateContactController));

router.patch(
  "/:id/favorite",
  favoriteValidation,
  asyncWrapper(favoriteContactController)
);

module.exports = { contactsRouter: router };
