const express = require('express')

const router = express.Router()

const indexContacts = require('../../controllers/contacts/indexContacts');
const showContacts = require('../../controllers/contacts/showContacts');
const deleteContacts = require('../../controllers/contacts/deleteContacts');
const updateContacts = require('../../controllers/contacts/updateContacts');
const createContacts = require('../../controllers/contacts/createContacts');


router.get('/', async (req, res, next) => indexContacts(req, res, next))

router.get('/:contactId', async (req, res, next) => showContacts(req, res, next))

router.post('/', async (req, res, next) => createContacts(req, res, next))

router.delete('/:contactId', async (req, res, next) => deleteContacts(req, res, next))

router.put('/:contactId', async (req, res, next) => updateContacts(req, res, next))

module.exports = router
