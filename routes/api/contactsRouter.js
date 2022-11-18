const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { auth } = require("../../middlewares/auth");
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

router.get("/", asyncWrapper(auth), asyncWrapper(listContactsController));
router.get(
  "/:contactId",
  asyncWrapper(auth),
  asyncWrapper(getContactByIdController)
);
router.post(
  "/",
  asyncWrapper(auth),
  addPostValidation,
  asyncWrapper(addContactController)
);
router.delete(
  "/:contactId",
  asyncWrapper(auth),
  asyncWrapper(removeContactController)
);
router.put(
  "/:contactId",
  asyncWrapper(auth),
  addPostValidation,
  asyncWrapper(updateContactController)
);
router.patch(
  "/:contactId/favorite",
  asyncWrapper(auth),
  addFavoriteValidation,
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
