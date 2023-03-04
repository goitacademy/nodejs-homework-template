const express = require("express");
const router = express.Router();
const {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsControllers");
const { asyncWrapper } = require("../../helpers/apiHelpers");

router.get("/", asyncWrapper(getContactsController));

router.get("/:id", asyncWrapper(getContactByIdController));

router.delete("/:id", asyncWrapper(deleteContactController));

router.post("/", asyncWrapper(addContactController));

router.put("/:id", asyncWrapper(updateContactController));

router.patch("/:id/favorite", asyncWrapper(updateStatusContactController));

module.exports = router;
