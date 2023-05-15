const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../controllers/controllers");

const { validateBody, validateStatus, isValidId } = require("../middlewares");

const { addSchema, statusSchema } = require("../utils/schemas");

router.route("/").get(getContacts).post(validateBody(addSchema), addContact);
router
  .route("/:contactId")
  .get(isValidId, getContact)
  .put(isValidId, validateBody(addSchema), updateContact)
  .delete(isValidId, removeContact);
router
  .route("/:contactId/favorite")
  .patch(isValidId, validateStatus(statusSchema), updateStatusContact);

module.exports = router;
