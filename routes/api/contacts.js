const express = require('express');
const router = express.Router();
const { validateRequest } = require('../../midleware/validateRequest');
const {
  schemaCreate,
  schemaPatch,
} = require('../../models/contacts')

const {
  getAll,
  getById,
  deleteById,
  createContact,
  updateById,
  updateStatusContact
} = require('../../controllers/contactControllers');

router.get('/', getAll)
router.get('/:contactId', getById);
router.patch('/:contactId', validateRequest(schemaPatch), updateStatusContact);
router.post('/', validateRequest(schemaCreate), createContact);
router.put('/:contactId', updateById);
router.delete('/:contactId', deleteById)

module.exports = router;