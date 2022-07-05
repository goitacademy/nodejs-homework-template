const express = require('express');
const router = express.Router();

const { addContactsValidation, putContactsValidation } = require("../../middlewares/joiValidation");
const {
  getContacts,
  getContact,
  postContact,
  deleteContact,
  putContact
} = require("../../controllers/contactControllers");


router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/', addContactsValidation, postContact)
router.delete('/:id', deleteContact);
router.put('/:id', putContactsValidation, putContact);

module.exports = router;


// * Обработка ошибок без http-errors:
// * const error = new Error("Not found");
// * error.status = 404;
// * throw error;