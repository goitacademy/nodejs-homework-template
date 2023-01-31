const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactController,
  changeContactController,
  changeFavoriteStatusController,
} = require("../../controllers/contacts");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  addContactValidation,
  patchValidation,
  getContactValidation,
  changeContactValidation,
} = require("../../middlewares/validationMaddleware");

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));

router.get(
  "/:contactId",
  getContactValidation,
  asyncWrapper(getContactByIdController)
);

router.post("/", addContactValidation, asyncWrapper(postContactController));

router.delete(
  "/:contactId",
  getContactValidation,
  asyncWrapper(deleteContactController)
);

router.put(
  "/:contactId",
  changeContactValidation,
  asyncWrapper(changeContactController)
);

router.patch(
  "/:contactId/favorite",
  patchValidation,
  asyncWrapper(changeFavoriteStatusController)
);

module.exports = router;
