const express = require('express');

const { schemaPatch, schemaCreate, schemaUpdate } = require('../../models/schemas/contact');
const { validateRequest } = require('../../middlewares/validateRequest');
const { auth } = require('../../middlewares/auth');
const { validateId } = require('../../middlewares/verifyId');

const ctrlContact = require('../../controller/contacts.js');

const router = express.Router();


router.get('/', auth, ctrlContact.get);

router.get('/:contactId', validateId, ctrlContact.getById);

router.post('/', validateRequest(schemaCreate), auth, ctrlContact.post);

router.delete('/:contactId', validateId, ctrlContact.remove);

router.put('/:contactId', validateId, validateRequest(schemaUpdate), ctrlContact.put);

router.patch('/:contactId/favorite', validateRequest(schemaPatch), ctrlContact.patch);

module.exports = router
