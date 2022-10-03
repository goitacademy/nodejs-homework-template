const express = require('express');
const asyncHandler = require('express-async-handler');

const {
  authMiddleware
} = require('../middlewares/authMiddleware');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../controllers/contactController');

const router = express.Router();

router.use(asyncHandler(authMiddleware));

router.get('/', asyncHandler(listContacts));

router.get('/:id', asyncHandler(getContactById));

router.post('/', asyncHandler(addContact));

router.delete('/:id', asyncHandler(removeContact));

router.put('/:id', asyncHandler(updateContact));

router.patch('/:id/favorite', asyncHandler(updateStatusContact));
  
module.exports = router
