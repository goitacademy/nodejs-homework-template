const express = require("express");
const {
  addContactValidation,
  changeContactValidation,
  changeFavoritetValidation,
} = require("../../middlewares/validationMiddleWare");

const {
  getContactsListController,
  contactByIdController,
  addNewContactController,
  deleteContactController,
  contactUpdateController,
  changeContactController,
  changeFavoriteContactController,
} = require("../../controllers/postControllerl");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(getContactsListController));

router.get("/:contactId", asyncWrapper(contactByIdController));

router.post("/", addContactValidation, asyncWrapper(addNewContactController));

router.delete("/:contactId", asyncWrapper(deleteContactController));

router.put(
  "/:contactId",
  addContactValidation,
  asyncWrapper(contactUpdateController)
);

router.patch(
  "/:contactId",
  changeContactValidation,
  asyncWrapper(changeContactController)
);
router.patch(
  "/:contactId/favorite",
  changeFavoritetValidation,
  asyncWrapper(changeFavoriteContactController)
);

module.exports = router;
