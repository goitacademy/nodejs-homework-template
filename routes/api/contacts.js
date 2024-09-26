const express = require('express')
const router = express.Router()
const {validateBody} = require('../../decorators')
const {schemas} = require('../../models/contact')
const controllers = require('../../controllers')

router.get('/', controllers.getAllContacts)

router.get('/:contactId', controllers.getContactById)

router.post('/', validateBody(schemas.addSchema), controllers.addNewContact)

router.delete('/:contactId', controllers.removeContactById)

router.put('/:contactId', validateBody(schemas.addSchema), controllers.updateContactById)

router.patch('/:contactId/favorite', validateBody(schemas.updateFavoriteSchema), controllers.updateFavorite)

module.exports = router
