const express = require('express')
const ctrlContacts = require('../../controller/contactsController');
const schema = require('../../schemas/schemas');
const validateBody = require('../../middlewares/validateBody')

const router = express.Router();

router.get('/', ctrlContacts.get)

router.get('/:contactId', ctrlContacts.getById)

router.post('/', validateBody(schema.addSchema), ctrlContacts.add)

router.delete('/:contactId', ctrlContacts.remove)

router.put('/:contactId', validateBody(schema.addSchema), ctrlContacts.update)

router.patch("/:contactId/favorite", validateBody(schema.updateFavoriteSchema), ctrlContacts.updateStatusContact)

module.exports = router
