const express = require('express');
const router = express.Router();
const {
  getContactsList,
  getContactById,
  createContact,
  deleteContactById,
  putUpdateContact,
  updateStatusContact
} = require('../../controller/cotactController');

router.get('/',getContactsList);
router.get('/:contactId',getContactById);
router.post('/',createContact);
router.delete('/:contactId',deleteContactById);
router.put('/:contactId',putUpdateContact);
router.patch('/:contactId/favorite', updateStatusContact)

module.exports = router;
