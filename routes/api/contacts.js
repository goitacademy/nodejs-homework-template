const express = require('express')
const { basedir } = global
const controllers = require(`${basedir}/controllers`)
const { controllersWrapper } = require(`${basedir}/helpers`)

const router = express.Router()

router.get('/', controllersWrapper(controllers.getAllContacts))

router.get('/:contactId', controllersWrapper(controllers.getContactById))

router.post('/', controllersWrapper(controllers.addContact))

router.delete('/:contactId', controllersWrapper(controllers.removeContact))

router.put('/:contactId', controllersWrapper(controllers.updateContactById))

router.patch(
  '/:contactId/favourite',
  controllersWrapper(controllers.updateStatusContact)
)

module.exports = router