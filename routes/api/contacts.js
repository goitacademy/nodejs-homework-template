const express = require('express');
const router = express.Router();
const {
  getContactsList,
  getContactById,
  createContact,
  deleteContactById,
  putUpdateContact
} = require('../../controller/cotactController');

router.get('/',getContactsList);
router.get('/:contactId',getContactById);
router.post('/',createContact);
router.delete('/:contactId',deleteContactById);
router.put('/:contactId',putUpdateContact);

module.exports = router;
