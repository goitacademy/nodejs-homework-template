const express = require('express')
const router = express.Router()
const middlewareToken = require('../../middleware/middlewareToken')
const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
} = require('../../controllers/contacts')

/**
 * /**
 * add middlewar
 */
router.use(middlewareToken)

/**
 * @ GET /api/contacts
 * нічого не отримує 
 * викликає функцію listContacts для роботи з json-файлом contacts.json 
 */
router.get('/', listContacts)

/**
 * @ GET /api/contacts/:id
 * Не отримує body
 * викликає функцію getById для роботи з json-файлом contacts.json
 */
router.get('/:contactId', getContactById)

/**
 * @ POST /api/contacts
 * Викликає функцію addContact(body) для збереження контакту в файлі contacts.json
 */
router.post('/', addContact)

/**
 * @ DELETE /api/contacts/:id
 * Не отримує body
 * Викликає функцію removeContact для роботи з json-файлом contacts.json
 */
router.delete('/:contactId', removeContact)

/**
 * @ PUT /api/contacts/:id
 * Якщо з body все добре, викликає функцію updateContact(contactId, body)
 */
router.put('/:contactId', updateContact)

/**
 * @ PATCH /api / contacts /:id/ favorite
 * Якщо з body все добре, викликає функцію updateStatusContact (contactId, body)
 */
router.patch('/:contactId/favorite', updateStatusContact)

module.exports = router
