const express = require("express");

const {
  getContactController,
  fetchContactByIdController,
  createContactController,
  deleteContactController,
  editContactController,
  patchContactController,
} = require("../../controllers/ContactController");

const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validation");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(getContactController));

router.get("/:contactId", asyncWrapper(fetchContactByIdController));

router.post("/", addContactValidation, asyncWrapper(createContactController));

router.delete("/:contactId", asyncWrapper(deleteContactController));

router.patch("/:contactId/favorite", asyncWrapper(patchContactController));

router.put(
  "/:contactId",
  updateContactValidation,
  asyncWrapper(editContactController)
);

module.exports = router;
