const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../controllers/contactsControllers");

const {
  validateBody,
  validateStatus,
  isValidId,
  authenticate,
} = require("../middlewares");

const { addSchema, statusSchema } = require("../utils/schemas");

router.use(authenticate);

router.route("/").get(getContacts).post(validateBody(addSchema), addContact);
router
  .route("/:contactId")
  .get(isValidId, getContact)
  .put(isValidId, validateBody(addSchema), updateContact)
  .delete(isValidId, removeContact);
router
  .route("/:contactId/favorite")
  .patch(isValidId, validateStatus(statusSchema), updateStatusContact);

module.exports = { contactsRouter: router };
