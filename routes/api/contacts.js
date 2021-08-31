const express = require('express')

const { joiContactSchema } = require('../../model/contact')
const { validation } = require('../../middlewares')
const ctrl = require('../../controllers/contacts')
const router = express.Router()

router.get('/', ctrl.listContacts)

router.get('/:id', ctrl.getContactById)

router.post('/', validation(joiContactSchema), ctrl.addContact)

router.delete('/:id', ctrl.removeContact)

router.put('/:id', validation(joiContactSchema), ctrl.updateContact)

router.patch('/:id/favorite', ctrl.updateFavorite)

module.exports = router
