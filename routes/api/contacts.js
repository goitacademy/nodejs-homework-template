const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
  updateStatusContactController,
} = require("../../models/contacts");
const { asyncWrapper } = require("../../Helpers/apiHelpers");
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));
router.get("/:id", asyncWrapper(getContactByIdController));
router.post("/", addContactValidation, asyncWrapper(addContactController));
router.delete("/:id", asyncWrapper(removeContactController));
router.patch("/:id/favorite", asyncWrapper(updateStatusContactController));
router.put(
  "/:id",
  updateContactValidation,
  asyncWrapper(updateContactController)
);

module.exports = router;
