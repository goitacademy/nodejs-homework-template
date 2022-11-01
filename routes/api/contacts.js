const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  addPostValidation,
  addFavoriteValidation,
} = require("../../middlewares/validationMiddleware");
const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", asyncWrapper(listContactsController));
router.get("/:contactId", asyncWrapper(getContactByIdController));
router.post("/", addPostValidation, asyncWrapper(addContactController));
router.delete("/:contactId", asyncWrapper(removeContactController));
router.put(
  "/:contactId",
  addPostValidation,
  asyncWrapper(updateContactController)
);
router.patch(
  "/:contactId/favorite",
  addFavoriteValidation,
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
