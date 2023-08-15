const express = require("express");

const router = express.Router();

const { isValidId } = require("../../utils/validation");
const { authenticate } = require("../../middlewares");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controller/contacts");

const {
  createContactValidator,
  updateContactValidator,
  updateStatusContactValidator,
} = require("../../utils/validation");

router
  .route("/")
  .post(authenticate, createContactValidator, addContact)
  .get(authenticate, listContacts);

router.use("/:id", authenticate, isValidId);

router
  .route("/:id")
  .get(authenticate, isValidId, getContactById)
  .put(authenticate, isValidId, updateContactValidator, updateContact)
  .delete(authenticate, isValidId, removeContact);

router
  .route("/:id/favorite")
  .patch(
    authenticate,
    isValidId,
    updateStatusContactValidator,
    updateStatusContact
  );

module.exports = router;
