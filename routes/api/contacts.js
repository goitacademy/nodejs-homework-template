const express = require('express');

const {deleteContact} = require('../../controllers/deleteContact');
const {getContactsList} = require('../../controllers/getContactsList');
const {addNewContact} = require('../../controllers/addNewContact');
const {getContactId} = require('../../controllers/getContactId');
const {updateContactById} = require('../../controllers/updateContactById');
const {updateStatus} = require('./../../controllers/updateStatus');

const router = express.Router();

router.get('/', getContactsList)

router.get('/:contactId', getContactId)

router.post('/', addNewContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', updateContactById)

router.patch('/:contactId/favorite', updateStatus)

module.exports = router;

