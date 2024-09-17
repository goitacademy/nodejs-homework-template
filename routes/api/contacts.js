const express = require('express')
const router = express.Router()

const {
  addValidation,
  updateValidation,
  statusValidation,
} = require("../../middlewares/validationMiddleware");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
} = require("../../сontrollers/contactsControllers");

const controllerError = require("../../сontrollers/controllerError")

router.get('/', (listContacts))

router.get('/:contactId', controllerError(getContactById))

router.post("/", addValidation, controllerError(addContact));

router.delete('/:contactId', controllerError(removeContact))

router.put("/:contactId", updateValidation, controllerError(updateContact));

router.patch("/:contactId/favorite", statusValidation, controllerError(updateStatus));

module.exports = router
