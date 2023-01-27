const express = require("express");

const router = express.Router();

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

router.post("/", asyncWrapper(addContactController));

router.delete("/:id", asyncWrapper(removeContactController));

router.put("/:id", asyncWrapper(updateContactController));

router.patch("/:id/favorite", asyncWrapper(favoriteContactController));

module.exports = { contactsRouter: router };
