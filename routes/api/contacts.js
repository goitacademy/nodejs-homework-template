const express = require('express')
const {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  refreshContact,
  updateStatContact,
} = require("../../controllers/contactsControllers");

const { validateBody } = require('../../decorators/validateBody');
const { contactSchema } = require('../../schemas/contactSchema');
const { addContactValidationSchema, updateContactValidationSchema } = require('../../utils/validation/contactValidationSchemas');

const router = express.Router()

router.route("/").get(getContacts).post(validateBody(addContactValidationSchema),createContact);
router.route("/:contactId").get(getContact).put(validateBody(addContactValidationSchema) ,refreshContact).delete(deleteContact);
router.route("/:contactId/favorite").patch(validateBody(updateContactValidationSchema), updateStatContact)

module.exports = router
