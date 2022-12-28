const express = require("express");
const router = express.Router();

const { validation } = require("../../middleware/validation");

const {
  addContactValidation,
  changeContactValidation,
  changeContactFavorite,
} = require("../../middleware/schemas/validationContact");

const {
  getContactsController,
  getContactByIdController,
  postAddContactController,
  deleteContactController,
  putChangeContactController,
  patchFavoriteContactController,
} = require("../../controllers/controllers");

router.get("/", getContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", validation(addContactValidation), postAddContactController);

router.delete("/:contactId", deleteContactController);

router.put(
  "/:contactId",
  validation(changeContactValidation),
  putChangeContactController
);

router.patch(
  "/:contactId/favorite",
  validation(changeContactFavorite),
  patchFavoriteContactController
);

module.exports = router;
