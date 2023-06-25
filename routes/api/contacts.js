const express = require('express');

const {
  getAllContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact
} = require('../../controllers/index');

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:contactId', getContactById);
router.delete('/:contactId', deleteContact);
router.post('/', postContact);
router.put('/:contactId', putContact);

module.exports = router;
