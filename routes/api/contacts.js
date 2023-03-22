const express = require('express')

const {asyncWrapper} = require('../../helpers/apihelpers')

const {listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact} = require('../../models/contacts');

const { authMiddleware } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware)

router.route('/')
  .post(asyncWrapper(addContact))
  .get(asyncWrapper(listContacts));

router
  .route('/:contactId')
  .get(asyncWrapper(getContactById))
  .put(asyncWrapper(updateContact))
  .delete(asyncWrapper(removeContact));

router.route('/:contactId/favorite')
  .patch(asyncWrapper(updateStatusContact));
module.exports = router;