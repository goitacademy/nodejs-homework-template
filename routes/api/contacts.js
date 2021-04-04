const express = require('express')
const router = express.Router()

const { ctrlContact } = require('../../controllers')

router.get('/', ctrlContact.get)

router.get('/:contactId', ctrlContact.getById)

router.post('/', express.json(), ctrlContact.add)

router.delete('/:contactId', ctrlContact.remove)

router.patch('/:contactId', express.json(), ctrlContact.update)

router.patch('/:contactId/favorite', express.json(), ctrlContact.updateById)

module.exports = router
