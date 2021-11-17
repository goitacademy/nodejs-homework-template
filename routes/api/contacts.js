const express = require('express')
const router = express.Router()
const contactsControllers = require('../../controllers/index')

router.get('/', (req, res, next) => contactsControllers.getAll(req, res, next))

router.get('/:contactId', (req, res, next) => contactsControllers.getById(req, res, next))

router.post('/', (req, res, next) => contactsControllers.post(req, res, next))

router.delete('/:contactId', (req, res, next) => contactsControllers.remove(req, res, next))

router.put('/:contactId', (req, res, next) => contactsControllers.update(req, res, next))

module.exports = router
