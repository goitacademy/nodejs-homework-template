const express = require('express')
const router = express.Router()
const contactsAddSchema = require('../../schemas/index')
const {validateBody} = require('../../utils/index')

const contactsController =  require('../../controller/contact-controller');

router.get('/', contactsController.getList);
router.get('/:contactId', contactsController.getContactsbyId);
router.post('/', validateBody(contactsAddSchema),contactsController.addContacts);
router.delete('/:contactId',contactsController.delContacts );
router.put('/:contactId', validateBody(contactsAddSchema),contactsController.updateContacts)

module.exports = router
