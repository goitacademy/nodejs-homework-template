const express = require('express');

const {
  getContacts,
  getContactnbyId,
  postContact,
  deleteContact,
  putContact,
} = require('../../controllers/contactsController');

const { validator } = require('../../middlewares/validator');
const { shemaContakts } = require('../../schemas/shemaContakts');
const router = express.Router();

router.get('/', getContacts);
router.get('/:contactId', getContactnbyId);
router.post('/', validator(shemaContakts), postContact);
router.delete('/:contactId', deleteContact);
router.put('/:contactId', validator(shemaContakts), putContact);

module.exports = router;
