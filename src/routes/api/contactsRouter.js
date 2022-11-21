const express = require("express");
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/contactsValidationMiddleware");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  changeContactByIdController,
  updateStatusContactController,
} = require("../../controllers/contactsControllers");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", addContactValidation, asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(removeContactController));

router.put(
  "/:contactId",
  updateContactValidation,
  asyncWrapper(changeContactByIdController)
);

router.patch(
  "/:contactId/favorite",
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
