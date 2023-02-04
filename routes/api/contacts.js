const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsSchema } = require("../../schemas/contact");
const {
  getAllContactsController,
  getContactsByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  changeFavouriteStatusController,
} = require("../../controller/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(getAllContactsController));

router.get("/:contactId", ctrlWrapper(getContactsByIdController));

router.post("/", validation(contactsSchema), ctrlWrapper(addContactController));

router.delete("/:contactId", ctrlWrapper(removeContactController));

router.put(
  "/:contactId",
  validation(contactsSchema),
  ctrlWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  ctrlWrapper(changeFavouriteStatusController)
);

module.exports = router;
