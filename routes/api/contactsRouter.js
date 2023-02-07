const express = require("express");

const {
  updateStatusValidation,
  changeContactValidation,
  addContactValidation,
} = require("../../utils/validation/postContactValidationSchema.js");

const { validationBody } = require("../../utils/validation/validationBody");

const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getContacts));
router.get("/:contactId", asyncWrapper(getContactById));
router.post(
  "/",
  validationBody(addContactValidation),
  asyncWrapper(addContact)
);
router.delete("/:contactId", asyncWrapper(removeContact));
router.put(
  "/:contactId",
  validationBody(changeContactValidation),
  asyncWrapper(updateContact)
);
router.patch(
  "/:contactId/favorite",
  validationBody(updateStatusValidation),
  asyncWrapper(updateStatusContact)
);

module.exports = { contactsRouter: router };
