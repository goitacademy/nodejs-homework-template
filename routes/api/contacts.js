const express = require('express');

const {deleteContact} = require('../../controllers/deleteContact');
const {getContactsList} = require('../../controllers/getContactsList');
const {addNewContact} = require('../../controllers/addNewContact');
const {getContactId} = require('../../controllers/getContactId');
const {updateContactById} = require('../../controllers/updateContactById');

const router = express.Router();

// router.route('/')
//   .post(addNewContact)
//   .get(getContactsList);


//   router.route('/:contactId')
//   .delete(deleteContact)
//   .get(getContactId)
//   .put(updateContactById);

router.get('/', getContactsList)

router.get('/:contactId', getContactId)

router.post('/', addNewContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', updateContactById)

module.exports = router;

