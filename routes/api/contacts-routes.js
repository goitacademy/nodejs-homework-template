const express = require('express');
const { 
  getListContacts,
  getContactById,
  postContact,
  deleteContactByid,
  putContactById,
  updateStatusContact
} = require('../../controllers/contacts-controller.js');
const { isValidId, authenticate } = require('../../middlewares/index.js')
const validateBody = require('../../utils/validateBody.js');
const { contactUpdateSchema, contactUpdateFavoriteSchema } = require('../../schemas/index.js')

const router = express.Router();

router.use(authenticate)

router.get('/', getListContacts)

router.get('/:contactId', isValidId, getContactById)

router.post('/', validateBody(contactUpdateSchema), postContact)

router.delete('/:contactId', isValidId, deleteContactByid)

router.put('/:contactId', isValidId, validateBody(contactUpdateSchema), putContactById)

router.patch('/:contactId/favorite', isValidId, validateBody(contactUpdateFavoriteSchema), updateStatusContact)

module.exports = router