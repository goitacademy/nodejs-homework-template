const express = require('express')

const router = express.Router()



const { contacts: ctrl } = require('../../controllers')



router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', ctrl.postContact)

router.delete('/:contactId', ctrl.deleteContact)

router.put(
  '/:contactId',ctrl.updateContacts

)

module.exports = router
