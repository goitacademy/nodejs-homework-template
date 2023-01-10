const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  postValidation,
  putValidation,
  patchValidation,
} = require("../../middleware/validationMiddlware");
const {
  getContactsController,
  getContactsByIdController,
  addContactsController,
  updateContactsByIdController,
  deleteContactsByIdController,
  updateFavoriteByIdController,
} = require("../../controllers/contactControllers");

router.get("/", asyncWrapper(getContactsController));
router.get("/:id", asyncWrapper(getContactsByIdController));
router.post("/", postValidation, asyncWrapper(addContactsController));
router.delete("/:id", asyncWrapper(deleteContactsByIdController));
router.put("/:id", putValidation, asyncWrapper(updateContactsByIdController));
router.patch(
  "/:id/favorite",
  patchValidation,
  asyncWrapper(updateFavoriteByIdController)
);

module.exports = router;
