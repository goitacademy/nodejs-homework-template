const express = require('express');
const ctrl = require('../../controllers/contacts');
const validateId = require('../../middlewares/idValidId')
// const validateBody = require('../../middlewares/validateBody');
// const {schema} = require ('../../schemas/contacts')

const router = express.Router();




router.get('/', ctrl.getContacts);

router.get('/:contactId',validateId, ctrl.getContactById);

router.post('/', ctrl.postContact);

router.delete('/:contactId', validateId, ctrl.deleteContact);

router.put('/:contactId', validateId, ctrl.putContact);

router.patch('/:contactId/favorite', validateId, ctrl.patchContact);


module.exports = router
