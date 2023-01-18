const express = require("express");
const {
  addContactValidation,
  changeContactValidation,
  changeFavoritetValidation,
} = require("../../middlewares/validationMiddleWare");
const { authenticate } = require("../../middlewares");
const {
  getContactsListController,
  contactByIdController,
  addNewContactController,
  deleteContactController,
  contactUpdateController,
  changeContactController,
  changeFavoriteContactController,
} = require("../../controllers/contactControllerl");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", authenticate, asyncWrapper(getContactsListController));

router.get("/:contactId", authenticate, asyncWrapper(contactByIdController));

router.post(
  "/",
  authenticate,
  addContactValidation,
  asyncWrapper(addNewContactController)
);

router.delete(
  "/:contactId",
  authenticate,
  asyncWrapper(deleteContactController)
);

router.put(
  "/:contactId",
  authenticate,
  addContactValidation,
  asyncWrapper(contactUpdateController)
);

router.patch(
  "/:contactId",
  authenticate,
  changeContactValidation,
  asyncWrapper(changeContactController)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  changeFavoritetValidation,
  asyncWrapper(changeFavoriteContactController)
);

module.exports = router;
