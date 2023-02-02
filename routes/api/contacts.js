const express = require("express");

const { validation } = require("../../middlewares");
const { errorHandling } = require("../../helpers");
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

router.get("/", errorHandling(getContactsListController));

router.get("/:id", errorHandling(getContactByIdController));

router.post(
  "/",
  validation(contactSchema),
  errorHandling(createContactController)
);

router.delete("/:id", errorHandling(removeContactByIdController));

router.put(
  "/:id",
  validation(contactSchema),
  errorHandling(updateContactByIdController)
);

router.patch(
  "/:id/favorite",
  validation(contactStatusSchema),
  errorHandling(updateStatusContactController)
);

module.exports = router;
