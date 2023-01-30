const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const {
  getContactsListController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  removeContactByIdController,
} = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(getContactsListController));

router.get("/:id", ctrlWrapper(getContactByIdController));

router.post(
  "/",
  validation(contactSchema),
  ctrlWrapper(createContactController)
);

router.delete("/:id", ctrlWrapper(removeContactByIdController));

router.put(
  "/:id",
  validation(contactSchema),
  ctrlWrapper(updateContactByIdController)
);

module.exports = router;
