const express = require('express');
const {isValidId} = require('../../middlewares');

const {
  getAllContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
  updateStatusContact
} = require('../../controllers/index');

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:contactId', isValidId, getContactById);
router.delete('/:contactId', isValidId, deleteContact);
router.post('/', postContact);
router.put('/:contactId', isValidId, putContact);
router.patch("/:contactId/favorite", isValidId, updateStatusContact);

module.exports = router;
