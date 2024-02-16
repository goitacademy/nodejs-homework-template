const express = require("express");
const {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  refreshContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers");

const { validateBody } = require("../../decorators/validateBody");
const {
  addContactValidationSchema,
  updateContactValidationSchema,
} = require("../../utils/validation/contactValidationSchemas");
const {authentificate} = require('../../utils/authentficate')

const router = express.Router();
router.use(authentificate);

router
  .route("/")
  .get(getContacts)
  .post(validateBody(addContactValidationSchema), createContact);
router
  .route("/:contactId")
  .get(getContact)
  .put(validateBody(addContactValidationSchema), refreshContact)
  .delete(deleteContact);
router
  .route("/:contactId/favorite")
  .patch(validateBody(updateContactValidationSchema), updateStatusContact);

module.exports = {contactsRouter: router};
