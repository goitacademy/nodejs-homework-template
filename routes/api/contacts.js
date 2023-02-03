const express = require("express");

const { validation } = require("../../middlewares");
const { errorHandler } = require("../../helpers");
const { contactSchema, contactStatusSchema } = require("../../schemas");
const {
  getContactsListController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  removeContactByIdController,
  updateStatusContactController,
} = require("../../controllers");

const router = express.Router();

router.get("/", errorHandler(getContactsListController));

router.get("/:id", errorHandler(getContactByIdController));

router.post(
  "/",
  validation(contactSchema),
  errorHandler(createContactController)
);

router.delete("/:id", errorHandler(removeContactByIdController));

router.put(
  "/:id",
  validation(contactSchema),
  errorHandler(updateContactByIdController)
);

router.patch(
  "/:id/favorite",
  validation(contactStatusSchema),
  errorHandler(updateStatusContactController)
);

module.exports = router;
