const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contacts')
// const { bodySchema } = require('./valid-contact')

/**
 * @ GET /api/contacts
 * нічого не отримує 
 * викликає функцію listContacts для роботи з json-файлом contacts.json 
 */
router.get('/', contactsController.listContacts)

/**
 * @ GET /api/contacts/:id
 * Не отримує body
 * викликає функцію getById для роботи з json-файлом contacts.json
 */
router.get('/:contactId', contactsController.getContactById)

/**
 * @ POST /api/contacts
 * Викликає функцію addContact(body) для збереження контакту в файлі contacts.json
 */
router.post('/', contactsController.addContact)

/**
 * @ DELETE /api/contacts/:id
 * Не отримує body
 * Викликає функцію removeContact для роботи з json-файлом contacts.json
 */
router.delete('/:contactId', contactsController.removeContact)

/**
 * @ PUT /api/contacts/:id
 * Якщо з body всі добре, викликає функцію updateContact(contactId, body)
 */
router.put('/:contactId', contactsController.updateContact)

router.patch('/:contactId/favorite', contactsController.updateStatusContact)

module.exports = router
