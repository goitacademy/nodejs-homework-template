const express = require('express');

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  patchContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");

const {
  putValidation,
  patchValidation,
  patchFavoriteValidation,
} = require("../../middlewares/validationMiddlewares");

const {asyncWrapper} = require("../../helpers/apiHelpers");

const router = express.Router()

router.get("/", asyncWrapper(getContactsController));
router.get("/:contactId", asyncWrapper(getContactByIdController));
router.post("/", putValidation, asyncWrapper(addContactController));
router.delete("/:contactId", asyncWrapper(removeContactController));
router.put("/:contactId", putValidation, asyncWrapper(updateContactController));
router.patch(
  "/:contactId",
  patchValidation,
  asyncWrapper(patchContactController)
);
router.patch(
  "/:contactId/favorite",
  patchFavoriteValidation,
  asyncWrapper(updateStatusContactController)
);

module.exports = router;