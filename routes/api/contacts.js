const express = require('express')
const router = express.Router()

const { getContact, getContactId, postContact, deleteContact, putContacts } = require('../../controllers/userControler')
const { contactsValidator, checkContactId } = require('../../middlewares/contactMiddleware')




router.route('/').post(contactsValidator, postContact).get(getContact)

router.use('/:contactId', checkContactId)
router.route('/:contactId').get(getContactId).put(putContacts).delete(deleteContact)

module.exports = router
