const express = require("express");
const {
  addContactValidation,
  putContactValidation,
} = require("../../middlewares/validationMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  getContactsController,
  getContactController,
  addContactToListController,
  deleteContactController,
  changeContactController,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactController));

router.post(
  "/",
  addContactValidation,
  asyncWrapper(addContactToListController)
);

router.delete("/:contactId", asyncWrapper(deleteContactController));

router.put(
  "/:contactId",
  putContactValidation,
  asyncWrapper(changeContactController)
);

module.exports = router;
