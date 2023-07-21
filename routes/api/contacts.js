const express = require('express');
const ctrl = require('../../controllers/contacts');
const {validateBody} = require('../../middlewares')
const {contactSchema} = require('../../shemas')
const router = express.Router()


router.get('/', ctrl.getAll )

router.get('/:contactId', ctrl.getById)

router.post('/', validateBody(contactSchema), ctrl.add )

router.delete('/:contactId', ctrl.deleteById)

router.put('/:contactId', validateBody(contactSchema), ctrl.update)

module.exports = router
