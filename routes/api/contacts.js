const express = require('express')
const router = express.Router()

const { contactSchema } = require('../../schemas')
const { controllerWrapper, validation } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

// router.get('/', controllerWrapper(ctrl.listContacts))
router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

// router.get('/:contactId', controllerWrapper(ctrl.getContactById))
router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.patch('/:contactId', controllerWrapper(ctrl.updateContact))

module.exports = router
