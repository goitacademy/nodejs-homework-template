const express = require("express");
const {
  addContactValidation,
  putContactValidation,
  updateStatusContactValidation,
} = require("../../middlewares/validationMiddleware");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  getContactsController,
  getContactController,
  addContactToListController,
  deleteContactController,
  changeContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");

const router = express.Router();

router.use(authMiddleware);

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
router.patch(
  "/:contactId/favorite",
  updateStatusContactValidation,
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
