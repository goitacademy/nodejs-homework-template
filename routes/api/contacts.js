const express = require('express')
const router = express.Router()
const controllerContact = require('../../controllError')

router.get('/', controllerContact.get)

router.get('/:contactId', controllerContact.getById)

router.post('/', controllerContact.add)

router.delete('/:contactId', controllerContact.remove)

router.patch('/:contactId', controllerContact.update)

module.exports = router
