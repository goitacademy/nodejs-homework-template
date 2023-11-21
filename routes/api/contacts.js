const express = require('express')
const router = express.Router()

const { getContact, getContactId, postContact, deleteContact, putContacts } = require('../../controllers/contactControler')
const { contactsValidator, checkContactId } = require('../../middlewares/contactMiddleware')
const { protect } = require('../../middlewares/userMiddlewares')


router.use(protect)

router.route('/').post(contactsValidator, postContact).get(getContact)

router.use('/:contactId', checkContactId)
router.route('/:contactId').get(getContactId).put(putContacts).delete(deleteContact)

module.exports = router
