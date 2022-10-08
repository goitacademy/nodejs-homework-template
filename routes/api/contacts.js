const express = require('express')
const { basedir } = global
const controllers = require(`${basedir}/controllers/contacts`)
const { controllersWrapper } = require(`${basedir}/helpers`)
const { auth } = require(`${basedir}/middlewares`)
const router = express.Router()

router.get('/', auth, controllersWrapper(controllers.getAllContacts))

router.get('/:contactId', auth, controllersWrapper(controllers.getContactById))

router.post('/', auth, controllersWrapper(controllers.addContact))

router.delete(
  '/:contactId',
  auth,
  controllersWrapper(controllers.removeContact)
)

router.put(
  '/:contactId',
  auth,
  controllersWrapper(controllers.updateContactById)
)

router.patch(
  '/:contactId/favourite',
  auth,
  controllersWrapper(controllers.updateStatusContact)
)

module.exports = router