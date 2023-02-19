const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { contactsSchema, favoriteSchema } = require("../../schemas/contact");
const {
  getAllContactsController,
  getContactsByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  changeFavouriteStatusController,
} = require("../../controller/contacts");

const router = express.Router();

router.use(authMiddleware);

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
  validation(favoriteSchema),
  ctrlWrapper(changeFavouriteStatusController)
);

module.exports = router;
