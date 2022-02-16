const express = require("express");

const {
  postValidationContact,
  putBodyValidation,
  putValidationContact,
  patchBodyValidation,
  patchValidationContact,
} = require("../../middlewares/validation");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getContactsController,
  getContactByIdController,
  addPostController,
  changePostController,
  patchPostController,
  removePostController,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));
router.get("/:contactId", asyncWrapper(getContactByIdController));
router.post("/", postValidationContact, asyncWrapper(addPostController));
router.put(
  "/:contactId",
  putBodyValidation,
  putValidationContact,
  asyncWrapper(changePostController)
);
router.patch(
  "/:contactId/favorite",
  patchBodyValidation,
  patchValidationContact,
  asyncWrapper(patchPostController)
);
router.delete("/:contactId", asyncWrapper(removePostController));

module.exports = router;
